import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import {
    loginWithEmailPassword,
    signupWithEmailPassword,
} from "../../lib/api/auth";

const { height } = Dimensions.get("window");

// ── COLOR PALETTE ───────────────────────────────────────────────────────────
const C = {
  bg: "#040c18",
  bgDeep: "#06122a",
  card: "#0d1f38",
  cardDark: "#0a1628",
  blue: "#4F8CFF",
  green: "#00D084",
  purple: "#a78bfa",
  textPrimary: "#e8edf5",
  textMuted: "rgba(232,237,245,0.55)",
  textFaint: "rgba(232,237,245,0.35)",
  white: "#ffffff",
  errorRed: "#ff6b6b",
};

// ── BACKGROUND ORBS ─────────────────────────────────────────────────────────
const AnimatedOrb = ({ size, color, duration, delay, reverse }: any) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration, delay, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay, duration]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, reverse ? 30 : -30],
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

// ── LIVE CALL CARD COMPONENTS ───────────────────────────────────────────────
const BlinkingDot = () => {
  const op = useRef(new Animated.Value(0.2)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(op, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(op, { toValue: 0.2, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.green, opacity: op }} />;
};

const AnimatedWavebars = () => {
  // 10 static bars with varying heights to simulate a voice waveform
  const bars = [12, 24, 16, 32, 22, 14, 28, 18, 10, 26];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, height: 32 }}>
      {bars.map((h, i) => {
        // Pseudo gradient across bars
        const color = i < 5 ? C.blue : C.green;
        return (
          <View key={i} style={{ width: 4, height: h, backgroundColor: color, borderRadius: 2, opacity: 0.8 }} />
        );
      })}
      <Text style={{ color: C.textMuted, fontSize: 13, marginLeft: 8, fontWeight: '600' }}>02:14</Text>
    </View>
  );
};

const TRANSCRIPTS = [
  [
    { speaker: '🤖', text: 'Connecting to lead...', color: C.blue },
  ],
  [
    { speaker: '🤖', text: 'Connecting to lead...', color: C.blue },
    { speaker: '👤', text: "Yes I'm looking for 3BHK", color: C.white },
  ],
  [
    { speaker: '🤖', text: 'Connecting to lead...', color: C.blue },
    { speaker: '👤', text: "Yes I'm looking for 3BHK", color: C.white },
    { speaker: '🤖', text: 'Budget around ₹80L?', color: C.blue },
  ]
];

const LiveAIagentCard = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    // 6s gentle bobbing
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true })
      ])
    ).start();

    // 4s pulse glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 2000, useNativeDriver: true })
      ])
    ).start();

    // 3s cycle transcript
    const interval = setInterval(() => {
      setTIdx((prev) => (prev + 1) % TRANSCRIPTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cardTranslateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -15] });
  const ringScale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const ringOp = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.4] });

  // Use CSS gradient on Web, fallback solid on Native
  const cardBgStyle = Platform.OS === 'web' 
    ? { backgroundImage: 'linear-gradient(145deg, #0d1f38, #0a1628)' as any }
    : { backgroundColor: '#0b192c' };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Animated Glowing Ring Backdrop */}
      <Animated.View style={{
        position: 'absolute',
        width: 404, // 380 + 24
        height: 484, 
        borderRadius: 24,
        borderWidth: 1,
        borderColor: C.blue,
        opacity: ringOp,
        transform: [{ scale: ringScale }, { translateY: cardTranslateY }]
      }} />

      {/* Main Calling Card */}
      <Animated.View style={[
        {
          width: 380,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(79,140,255,0.25)',
          padding: 24,
          transform: [{ translateY: cardTranslateY }],
          shadowColor: C.blue,
          shadowOpacity: 0.15,
          shadowRadius: 60,
          elevation: 20,
        },
        cardBgStyle
      ]}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <BlinkingDot />
            <Text style={{ color: C.green, fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>AI AGENT CALLING...</Text>
          </View>
          <AnimatedWavebars />
        </View>

        {/* Info Panel */}
        <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1 }}>LEAD</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '600' }}>Rahul Sharma</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1 }}>BUDGET</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '600' }}>₹80 Lakhs</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1 }}>LOCATION</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '600' }}>Whitefield</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1 }}>TYPE</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '600' }}>3BHK</Text>
            </View>
          </View>
        </View>

        {/* Live Transcript */}
        <Text style={{ fontSize: 11, color: C.textFaint, fontWeight: '700', letterSpacing: 1, marginBottom: 8 }}>LIVE TRANSCRIPT</Text>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', minHeight: 96, marginBottom: 20 }}>
          {TRANSCRIPTS[tIdx].map((msg, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Text style={{ fontSize: 14 }}>{msg.speaker}</Text>
              <Text style={{ fontSize: 14, color: msg.color, fontWeight: '500' }}>{msg.text}</Text>
            </View>
          ))}
        </View>

        {/* Qualification Summary */}
        <View style={{ backgroundColor: 'rgba(0,208,132,0.05)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,208,132,0.2)' }}>
          <Text style={{ fontSize: 11, color: C.green, fontWeight: '700', letterSpacing: 1, marginBottom: 8 }}>AI QUALIFICATION SUMMARY</Text>
          <Text style={{ fontSize: 13, color: C.white, marginBottom: 4 }}>✓ Buyer interested in 3BHK</Text>
          <Text style={{ fontSize: 13, color: C.white, marginBottom: 4 }}>✓ Budget confirmed: ₹80L</Text>
          <Text style={{ fontSize: 13, color: C.white }}>✓ Site visit suggested</Text>
        </View>

        {/* Hot Lead Pill */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(245, 166, 35, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(245, 166, 35, 0.3)' }}>
            <Text style={{ fontSize: 12 }}>🔥</Text>
            <Text style={{ fontSize: 12, color: '#F5A623', fontWeight: '700' }}>Hot Lead</Text>
          </View>
          <Text style={{ fontSize: 12, color: C.textMuted }}>Follow-up in 24 hrs</Text>
        </View>
      </Animated.View>
    </View>
  );
};

// ── INPUT FIELD ───────────────────────────────────────────────────────────
const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry, icon }: any) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 11, color: C.textMuted, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
        {label}
      </Text>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(79,140,255,0.06)",
        borderWidth: 1,
        borderColor: focused ? C.blue : "rgba(79,140,255,0.2)",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 13,
        // Box shadow simulation for Web focus
        ...(Platform.OS === 'web' && focused ? { boxShadow: '0 0 0 3px rgba(79,140,255,0.15)' } as any : {})
      }}>
        <Text style={{ fontSize: 16, marginRight: 10 }}>{icon}</Text>
        <TextInput
          style={{ flex: 1, color: C.white, fontSize: 15, fontWeight: "400" }}
          placeholder={placeholder}
          placeholderTextColor={C.textFaint}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
};

// ── MAIN SCREEN ───────────────────────────────────────────────────────────
export default function PremiumSignupScreen() {
  const { isDesktop } = useResponsive();
  const [mode, setMode] = useState<'login' | 'signup'>("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fillDevCredentials = () => {
    setMode("login");
    setEmail("admin@maxsas.com");
    setPassword("Admin@123456");
    setErrorMessage(null);
  };

  const handleAuth = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedFullName = fullName.trim();

    if (!normalizedEmail || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    if (mode === "signup" && !normalizedFullName) {
      setErrorMessage("Full name is required for signup.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response =
        mode === "signup"
          ? await signupWithEmailPassword({
              fullName: normalizedFullName,
              email: normalizedEmail,
              password,
            })
          : await loginWithEmailPassword({
              email: normalizedEmail,
              password,
            });

      if (!response.success) {
        if (__DEV__ && response.error.code === "INVALID_CREDENTIALS") {
          setErrorMessage("Invalid email or password. Try dev login: admin@maxsas.com / Admin@123456");
        } else {
          setErrorMessage(response.error.message || "Authentication failed.");
        }
        return;
      }

      router.replace('/(protected)/lexus');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formCardBg = Platform.OS === 'web'
    ? { backgroundImage: 'linear-gradient(145deg, #0d1f38, #0a1628)' as any }
    : { backgroundColor: '#0d1f38' };

  const primaryBtnBg = Platform.OS === 'web'
    ? { backgroundImage: 'linear-gradient(135deg, #4F8CFF, #2563eb)' as any }
    : { backgroundColor: '#4F8CFF' };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: C.bg, flexDirection: isDesktop ? 'row' : 'column' }} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* ── LEFT VISUAL PANEL (58%) ── */}
      {isDesktop && (
        <View style={{ flex: 0.58, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
          {/* Subtle Grid Pattern */}
          {Platform.OS === 'web' && (
            <View style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'linear-gradient(rgba(79,140,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.04) 1px, transparent 1px)', backgroundSize: '50px 50px' } as any} />
          )}

          {/* Glowing Background Orbs */}
          <AnimatedOrb size={250} color="rgba(79,140,255,0.08)" duration={8000} delay={0} />
          <View style={{ position: 'absolute', bottom: height * 0.1, right: Dimensions.get('window').width * 0.1 }}>
            <AnimatedOrb size={180} color="rgba(0,208,132,0.06)" duration={10000} delay={1000} reverse />
          </View>

          {/* Product Header */}
          <View style={{ marginBottom: 40, alignItems: 'center', zIndex: 10, paddingHorizontal: 40 }}>
            <Text style={{ color: C.white, fontSize: 32, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5, marginBottom: 8 }}>
              AI voice agents that qualify, score
            </Text>
            <Text style={{ color: C.blue, fontSize: 32, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5 }}>
              and route property leads automatically.
            </Text>
          </View>

          {/* Central Live Card */}
          <LiveAIagentCard />

          {/* Live Platform Stats */}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 40, zIndex: 10 }}>
            {[
              { label: 'Avg Voice Latency', val: '< 600ms', icon: '⚡' },
              { label: 'Qualified Leads', val: '142 Today', icon: '🎯' },
              { label: 'Active Campaigns', val: '8 Live', icon: '📞' }
            ].map(stat => (
              <View key={stat.label} style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: 'rgba(79,140,255,0.15)', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 14, alignItems: 'center', minWidth: 140 }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>{stat.icon}</Text>
                <Text style={{ color: C.white, fontSize: 18, fontWeight: '800', marginBottom: 2 }}>{stat.val}</Text>
                <Text style={{ color: C.textFaint, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ── RIGHT FORM PANEL (42%) ── */}
      <View style={{ flex: isDesktop ? 0.42 : 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
        
        {/* Maximum width enforcement for Web Form alignment */}
        <View style={{ width: '100%', maxWidth: 460 }}>
          
          <ScrollView contentContainerStyle={{ paddingVertical: isDesktop ? 40 : 80 }} showsVerticalScrollIndicator={false}>
            
            {/* Form Card Enclosure */}
            <View style={[
              {
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgba(79,140,255,0.2)',
                padding: isDesktop ? 40 : 28,
                shadowColor: '#000',
                shadowOpacity: 0.5,
                shadowRadius: 64,
                shadowOffset: { width: 0, height: 24 }
              },
              formCardBg
            ]}>
              
              {/* Logo & Headlines */}
              <View style={{ marginBottom: 32 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24, alignSelf: 'center' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.blue, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>🏠</Text>
                  </View>
                  <Text style={{ fontSize: 18, color: C.white, fontWeight: '700', letterSpacing: -0.5 }}>Maxsas Realty AI</Text>
                </View>
                
                <Text style={{ fontSize: 26, color: C.white, fontWeight: '800', marginBottom: 8, letterSpacing: -0.5 }}>
                  {mode === 'login' ? 'Built for brokers, teams and real-estate operators.' : 'Start automating your property leads.'}
                </Text>
                <Text style={{ fontSize: 15, color: C.textMuted, lineHeight: 22, marginBottom: 24 }}>
                  {mode === 'login' ? 'Manage AI calls, campaign performance and lead outcomes from one workspace.' : 'Deploy AI voice agents in minutes and qualify prospects effortlessly.'}
                </Text>

                {/* Value / Trust List */}
                <View style={{ gap: 12, backgroundColor: 'rgba(0,0,0,0.15)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' }}>
                  {[
                    "Lead qualification in minutes",
                    "Voice campaigns with live tracking",
                    "Built for real-estate sales teams"
                  ].map((feat, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(0,208,132,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,208,132,0.3)' }}>
                         <Text style={{ color: C.green, fontSize: 10, fontWeight: '900' }}>✓</Text>
                      </View>
                      <Text style={{ color: C.textPrimary, fontSize: 14, fontWeight: '500' }}>{feat}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Login / Signup Pill Toggle */}
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(79,140,255,0.15)', padding: 4, marginBottom: 32 }}>
                {(['login', 'signup'] as const).map(m => {
                  const isActive = mode === m;
                  return (
                    <TouchableOpacity 
                      key={m} 
                      onPress={() => setMode(m)} 
                      style={{ flex: 1, paddingVertical: 10, borderRadius: 8, 
                               ...(isActive && Platform.OS === 'web' ? { backgroundImage: 'linear-gradient(135deg, rgba(79,140,255,0.8), rgba(37,99,235,0.8))' } as any : isActive ? {backgroundColor: C.blue} : {}) }}
                    >
                      <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: isActive ? '700' : '600', color: isActive ? C.white : C.textMuted }}>
                        {m === 'login' ? 'Log In' : 'Sign Up'}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>

              {/* Core Inputs */}
              {mode === 'signup' && (
                <InputField
                  label="Full Name"
                  placeholder="Rahul Sharma"
                  value={fullName}
                  onChangeText={setFullName}
                  icon="👤"
                />
              )}
              <InputField label="Email Address" placeholder="rahul@example.com" value={email} onChangeText={setEmail} icon="✉️" />
              <InputField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry icon="🔒" />

              <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: -6, marginBottom: 24 }}>
                <Text style={{ color: C.blue, fontSize: 12, fontWeight: '600' }}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Actions */}
              <TouchableOpacity 
                onPress={handleAuth}
                disabled={isSubmitting}
                style={[
                  { height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', shadowColor: C.blue, shadowOpacity: 0.35, shadowRadius: 30, shadowOffset: { width: 0, height: 0 }, elevation: 10, marginBottom: 12, opacity: isSubmitting ? 0.7 : 1 },
                  primaryBtnBg
                ]}
              >
                <Text style={{ color: C.white, fontSize: 15, fontWeight: '700' }}>
                  {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log In to Workspace' : 'Create Free Account'}
                </Text>
              </TouchableOpacity>

              {!!errorMessage && (
                <Text style={{ color: C.errorRed, fontSize: 12, textAlign: 'center', marginBottom: 12 }}>
                  {errorMessage}
                </Text>
              )}

              <Text style={{ color: C.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 24 }}>
                🔒 Secure access for your campaigns, leads and calling data.
              </Text>

              {/* Dev Shortcut - De-emphasized slightly */}
              <View style={{ gap: 8 }}>
                <TouchableOpacity
                  onPress={fillDevCredentials}
                  style={{
                    backgroundColor: 'rgba(79,140,255,0.08)',
                    borderWidth: 1,
                    borderColor: 'rgba(79,140,255,0.28)',
                    height: 40,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: C.blue, fontSize: 12, fontWeight: '700' }}>Use Dev Credentials</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => router.replace('/(protected)/lexus')}
                  style={{ 
                    backgroundColor: 'rgba(124,58,237,0.05)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', 
                    height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' 
                  }}
                >
                  <Text style={{ color: C.purple, fontSize: 13, fontWeight: '700' }}>DEV LOGIN (Bypass)</Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <Text style={{ marginHorizontal: 12, fontSize: 12, color: C.textMuted }}>or continue with</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              </View>

              {/* OAuth */}
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {[ { icon: "G", label: "Google", color: "#ea4335" }, { icon: "in", label: "LinkedIn", color: "#0077b5" } ].map(s => (
                  <TouchableOpacity key={s.label} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 46, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: s.color }}>{s.icon}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: C.textMuted }}>{s.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
            
            {/* Bottom Form Footer Text */}
            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                <Text style={{ fontSize: 14, color: C.textMuted, marginBottom: 16 }}>
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <Text style={{ color: C.blue, fontWeight: '700' }}>{mode === 'login' ? 'Sign Up Free →' : 'Log In →'}</Text>
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: C.textFaint }}>© 2026 Maxsas Realty AI</Text>
            </View>

          </ScrollView>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
