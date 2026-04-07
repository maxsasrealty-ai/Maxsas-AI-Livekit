import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { Request, Response, Router } from "express";

import { prisma } from "../lib/prisma";

const authRouter = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value: string): string {
	return value.trim().toLowerCase();
}

function hashPassword(password: string): string {
	const salt = randomBytes(16).toString("hex");
	const hash = scryptSync(password, salt, 64).toString("hex");
	return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
	const [salt, storedHash] = stored.split(":");
	if (!salt || !storedHash) {
		return false;
	}

	const derivedHash = scryptSync(password, salt, 64).toString("hex");
	return timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(derivedHash, "hex"));
}

authRouter.post("/signup", async (req: Request, res: Response) => {
	const fullName = typeof req.body?.fullName === "string" ? req.body.fullName.trim() : "";
	const email = typeof req.body?.email === "string" ? normalizeEmail(req.body.email) : "";
	const password = typeof req.body?.password === "string" ? req.body.password : "";

	if (!fullName || !email || !password) {
		res.status(400).json({
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "fullName, email and password are required",
			},
		});
		return;
	}

	if (!EMAIL_REGEX.test(email)) {
		res.status(400).json({
			success: false,
			error: {
				code: "INVALID_EMAIL",
				message: "Please enter a valid email address",
			},
		});
		return;
	}

	if (password.length < 8) {
		res.status(400).json({
			success: false,
			error: {
				code: "WEAK_PASSWORD",
				message: "Password must be at least 8 characters long",
			},
		});
		return;
	}

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		res.status(409).json({
			success: false,
			error: {
				code: "EMAIL_ALREADY_EXISTS",
				message: "An account with this email already exists",
			},
		});
		return;
	}

	try {
		const passwordHash = hashPassword(password);
		const result = await prisma.$transaction(async (tx) => {
			const tenant = await tx.tenant.create({
				data: {
					name: `${fullName}'s Workspace`,
				},
			});

			const user = await tx.user.create({
				data: {
					fullName,
					email,
					passwordHash,
					tenantId: tenant.id,
				},
			});

			return {
				id: user.id,
				email: user.email,
				fullName: user.fullName,
				tenantId: user.tenantId,
				createdAt: user.createdAt,
			};
		});

		res.status(201).json({
			success: true,
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: {
				code: "SIGNUP_FAILED",
				message: error instanceof Error ? error.message : "Unable to create account",
			},
		});
	}
});

authRouter.post("/login", async (req: Request, res: Response) => {
	const email = typeof req.body?.email === "string" ? normalizeEmail(req.body.email) : "";
	const password = typeof req.body?.password === "string" ? req.body.password : "";

	if (!email || !password) {
		res.status(400).json({
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "email and password are required",
			},
		});
		return;
	}

	const user = await prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			email: true,
			fullName: true,
			tenantId: true,
			passwordHash: true,
			createdAt: true,
		},
	});

	if (!user || !verifyPassword(password, user.passwordHash)) {
		res.status(401).json({
			success: false,
			error: {
				code: "INVALID_CREDENTIALS",
				message: "Invalid email or password",
			},
		});
		return;
	}

	res.status(200).json({
		success: true,
		data: {
			id: user.id,
			email: user.email,
			fullName: user.fullName,
			tenantId: user.tenantId,
			createdAt: user.createdAt,
		},
	});
});

export default authRouter;
