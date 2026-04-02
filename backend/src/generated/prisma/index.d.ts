
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model CallSession
 * 
 */
export type CallSession = $Result.DefaultSelection<Prisma.$CallSessionPayload>
/**
 * Model CallEvent
 * 
 */
export type CallEvent = $Result.DefaultSelection<Prisma.$CallEventPayload>
/**
 * Model TranscriptSegment
 * 
 */
export type TranscriptSegment = $Result.DefaultSelection<Prisma.$TranscriptSegmentPayload>
/**
 * Model LeadExtraction
 * 
 */
export type LeadExtraction = $Result.DefaultSelection<Prisma.$LeadExtractionPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model CampaignCall
 * 
 */
export type CampaignCall = $Result.DefaultSelection<Prisma.$CampaignCallPayload>
/**
 * Model CampaignContact
 * 
 */
export type CampaignContact = $Result.DefaultSelection<Prisma.$CampaignContactPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PlanKey: {
  basic: 'basic',
  pro: 'pro',
  enterprise: 'enterprise'
};

export type PlanKey = (typeof PlanKey)[keyof typeof PlanKey]


export const CallLifecycleStatus: {
  initiated: 'initiated',
  dispatching: 'dispatching',
  ringing: 'ringing',
  connected: 'connected',
  active: 'active',
  completed: 'completed',
  failed: 'failed'
};

export type CallLifecycleStatus = (typeof CallLifecycleStatus)[keyof typeof CallLifecycleStatus]


export const Speaker: {
  user: 'user',
  agent: 'agent'
};

export type Speaker = (typeof Speaker)[keyof typeof Speaker]


export const CampaignStatus: {
  draft: 'draft',
  queued: 'queued',
  active: 'active',
  completed: 'completed',
  archived: 'archived'
};

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus]

}

export type PlanKey = $Enums.PlanKey

export const PlanKey: typeof $Enums.PlanKey

export type CallLifecycleStatus = $Enums.CallLifecycleStatus

export const CallLifecycleStatus: typeof $Enums.CallLifecycleStatus

export type Speaker = $Enums.Speaker

export const Speaker: typeof $Enums.Speaker

export type CampaignStatus = $Enums.CampaignStatus

export const CampaignStatus: typeof $Enums.CampaignStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.callSession`: Exposes CRUD operations for the **CallSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallSessions
    * const callSessions = await prisma.callSession.findMany()
    * ```
    */
  get callSession(): Prisma.CallSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.callEvent`: Exposes CRUD operations for the **CallEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallEvents
    * const callEvents = await prisma.callEvent.findMany()
    * ```
    */
  get callEvent(): Prisma.CallEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transcriptSegment`: Exposes CRUD operations for the **TranscriptSegment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TranscriptSegments
    * const transcriptSegments = await prisma.transcriptSegment.findMany()
    * ```
    */
  get transcriptSegment(): Prisma.TranscriptSegmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadExtraction`: Exposes CRUD operations for the **LeadExtraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadExtractions
    * const leadExtractions = await prisma.leadExtraction.findMany()
    * ```
    */
  get leadExtraction(): Prisma.LeadExtractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignCall`: Exposes CRUD operations for the **CampaignCall** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignCalls
    * const campaignCalls = await prisma.campaignCall.findMany()
    * ```
    */
  get campaignCall(): Prisma.CampaignCallDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignContact`: Exposes CRUD operations for the **CampaignContact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignContacts
    * const campaignContacts = await prisma.campaignContact.findMany()
    * ```
    */
  get campaignContact(): Prisma.CampaignContactDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.0
   * Query Engine version: c0aafc03b8ef6cdced8654b9a817999e02457d6a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    CallSession: 'CallSession',
    CallEvent: 'CallEvent',
    TranscriptSegment: 'TranscriptSegment',
    LeadExtraction: 'LeadExtraction',
    Campaign: 'Campaign',
    CampaignCall: 'CampaignCall',
    CampaignContact: 'CampaignContact'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tenant" | "callSession" | "callEvent" | "transcriptSegment" | "leadExtraction" | "campaign" | "campaignCall" | "campaignContact"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      CallSession: {
        payload: Prisma.$CallSessionPayload<ExtArgs>
        fields: Prisma.CallSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          findFirst: {
            args: Prisma.CallSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          findMany: {
            args: Prisma.CallSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>[]
          }
          create: {
            args: Prisma.CallSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          createMany: {
            args: Prisma.CallSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>[]
          }
          delete: {
            args: Prisma.CallSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          update: {
            args: Prisma.CallSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          deleteMany: {
            args: Prisma.CallSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>[]
          }
          upsert: {
            args: Prisma.CallSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          aggregate: {
            args: Prisma.CallSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallSession>
          }
          groupBy: {
            args: Prisma.CallSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CallSessionCountAggregateOutputType> | number
          }
        }
      }
      CallEvent: {
        payload: Prisma.$CallEventPayload<ExtArgs>
        fields: Prisma.CallEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>
          }
          findFirst: {
            args: Prisma.CallEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>
          }
          findMany: {
            args: Prisma.CallEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>[]
          }
          create: {
            args: Prisma.CallEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>
          }
          createMany: {
            args: Prisma.CallEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>[]
          }
          delete: {
            args: Prisma.CallEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>
          }
          update: {
            args: Prisma.CallEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>
          }
          deleteMany: {
            args: Prisma.CallEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>[]
          }
          upsert: {
            args: Prisma.CallEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEventPayload>
          }
          aggregate: {
            args: Prisma.CallEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallEvent>
          }
          groupBy: {
            args: Prisma.CallEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallEventCountArgs<ExtArgs>
            result: $Utils.Optional<CallEventCountAggregateOutputType> | number
          }
        }
      }
      TranscriptSegment: {
        payload: Prisma.$TranscriptSegmentPayload<ExtArgs>
        fields: Prisma.TranscriptSegmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TranscriptSegmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TranscriptSegmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>
          }
          findFirst: {
            args: Prisma.TranscriptSegmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TranscriptSegmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>
          }
          findMany: {
            args: Prisma.TranscriptSegmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>[]
          }
          create: {
            args: Prisma.TranscriptSegmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>
          }
          createMany: {
            args: Prisma.TranscriptSegmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TranscriptSegmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>[]
          }
          delete: {
            args: Prisma.TranscriptSegmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>
          }
          update: {
            args: Prisma.TranscriptSegmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>
          }
          deleteMany: {
            args: Prisma.TranscriptSegmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TranscriptSegmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TranscriptSegmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>[]
          }
          upsert: {
            args: Prisma.TranscriptSegmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>
          }
          aggregate: {
            args: Prisma.TranscriptSegmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTranscriptSegment>
          }
          groupBy: {
            args: Prisma.TranscriptSegmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TranscriptSegmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TranscriptSegmentCountArgs<ExtArgs>
            result: $Utils.Optional<TranscriptSegmentCountAggregateOutputType> | number
          }
        }
      }
      LeadExtraction: {
        payload: Prisma.$LeadExtractionPayload<ExtArgs>
        fields: Prisma.LeadExtractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadExtractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadExtractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>
          }
          findFirst: {
            args: Prisma.LeadExtractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadExtractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>
          }
          findMany: {
            args: Prisma.LeadExtractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>[]
          }
          create: {
            args: Prisma.LeadExtractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>
          }
          createMany: {
            args: Prisma.LeadExtractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadExtractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>[]
          }
          delete: {
            args: Prisma.LeadExtractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>
          }
          update: {
            args: Prisma.LeadExtractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>
          }
          deleteMany: {
            args: Prisma.LeadExtractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadExtractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadExtractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>[]
          }
          upsert: {
            args: Prisma.LeadExtractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadExtractionPayload>
          }
          aggregate: {
            args: Prisma.LeadExtractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadExtraction>
          }
          groupBy: {
            args: Prisma.LeadExtractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadExtractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadExtractionCountArgs<ExtArgs>
            result: $Utils.Optional<LeadExtractionCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      CampaignCall: {
        payload: Prisma.$CampaignCallPayload<ExtArgs>
        fields: Prisma.CampaignCallFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignCallFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignCallFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>
          }
          findFirst: {
            args: Prisma.CampaignCallFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignCallFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>
          }
          findMany: {
            args: Prisma.CampaignCallFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>[]
          }
          create: {
            args: Prisma.CampaignCallCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>
          }
          createMany: {
            args: Prisma.CampaignCallCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCallCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>[]
          }
          delete: {
            args: Prisma.CampaignCallDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>
          }
          update: {
            args: Prisma.CampaignCallUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>
          }
          deleteMany: {
            args: Prisma.CampaignCallDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignCallUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignCallUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>[]
          }
          upsert: {
            args: Prisma.CampaignCallUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignCallPayload>
          }
          aggregate: {
            args: Prisma.CampaignCallAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignCall>
          }
          groupBy: {
            args: Prisma.CampaignCallGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignCallGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCallCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCallCountAggregateOutputType> | number
          }
        }
      }
      CampaignContact: {
        payload: Prisma.$CampaignContactPayload<ExtArgs>
        fields: Prisma.CampaignContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>
          }
          findFirst: {
            args: Prisma.CampaignContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>
          }
          findMany: {
            args: Prisma.CampaignContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>[]
          }
          create: {
            args: Prisma.CampaignContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>
          }
          createMany: {
            args: Prisma.CampaignContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>[]
          }
          delete: {
            args: Prisma.CampaignContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>
          }
          update: {
            args: Prisma.CampaignContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>
          }
          deleteMany: {
            args: Prisma.CampaignContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>[]
          }
          upsert: {
            args: Prisma.CampaignContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignContactPayload>
          }
          aggregate: {
            args: Prisma.CampaignContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignContact>
          }
          groupBy: {
            args: Prisma.CampaignContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignContactCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignContactCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tenant?: TenantOmit
    callSession?: CallSessionOmit
    callEvent?: CallEventOmit
    transcriptSegment?: TranscriptSegmentOmit
    leadExtraction?: LeadExtractionOmit
    campaign?: CampaignOmit
    campaignCall?: CampaignCallOmit
    campaignContact?: CampaignContactOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    callSessions: number
    campaigns: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSessions?: boolean | TenantCountOutputTypeCountCallSessionsArgs
    campaigns?: boolean | TenantCountOutputTypeCountCampaignsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountCallSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallSessionWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }


  /**
   * Count Type CallSessionCountOutputType
   */

  export type CallSessionCountOutputType = {
    events: number
    transcriptSegments: number
    campaignLinks: number
    sourceContacts: number
  }

  export type CallSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | CallSessionCountOutputTypeCountEventsArgs
    transcriptSegments?: boolean | CallSessionCountOutputTypeCountTranscriptSegmentsArgs
    campaignLinks?: boolean | CallSessionCountOutputTypeCountCampaignLinksArgs
    sourceContacts?: boolean | CallSessionCountOutputTypeCountSourceContactsArgs
  }

  // Custom InputTypes
  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSessionCountOutputType
     */
    select?: CallSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallEventWhereInput
  }

  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeCountTranscriptSegmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranscriptSegmentWhereInput
  }

  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeCountCampaignLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignCallWhereInput
  }

  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeCountSourceContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignContactWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    calls: number
    contacts: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | CampaignCountOutputTypeCountCallsArgs
    contacts?: boolean | CampaignCountOutputTypeCountContactsArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignCallWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignContactWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    plan: $Enums.PlanKey | null
    workspaceConfigJson: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    plan: $Enums.PlanKey | null
    workspaceConfigJson: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    plan: number
    workspaceConfigJson: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    workspaceConfigJson?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    workspaceConfigJson?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    workspaceConfigJson?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string | null
    plan: $Enums.PlanKey
    workspaceConfigJson: string | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    workspaceConfigJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    callSessions?: boolean | Tenant$callSessionsArgs<ExtArgs>
    campaigns?: boolean | Tenant$campaignsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    workspaceConfigJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    workspaceConfigJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    plan?: boolean
    workspaceConfigJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "plan" | "workspaceConfigJson" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSessions?: boolean | Tenant$callSessionsArgs<ExtArgs>
    campaigns?: boolean | Tenant$campaignsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      callSessions: Prisma.$CallSessionPayload<ExtArgs>[]
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      plan: $Enums.PlanKey
      workspaceConfigJson: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    callSessions<T extends Tenant$callSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$callSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaigns<T extends Tenant$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly plan: FieldRef<"Tenant", 'PlanKey'>
    readonly workspaceConfigJson: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.callSessions
   */
  export type Tenant$callSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    where?: CallSessionWhereInput
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    cursor?: CallSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * Tenant.campaigns
   */
  export type Tenant$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model CallSession
   */

  export type AggregateCallSession = {
    _count: CallSessionCountAggregateOutputType | null
    _avg: CallSessionAvgAggregateOutputType | null
    _sum: CallSessionSumAggregateOutputType | null
    _min: CallSessionMinAggregateOutputType | null
    _max: CallSessionMaxAggregateOutputType | null
  }

  export type CallSessionAvgAggregateOutputType = {
    durationSec: number | null
    transcriptTurns: number | null
    estimatedCost: number | null
  }

  export type CallSessionSumAggregateOutputType = {
    durationSec: number | null
    transcriptTurns: number | null
    estimatedCost: number | null
  }

  export type CallSessionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    roomId: string | null
    phoneNumber: string | null
    agentName: string | null
    direction: string | null
    status: $Enums.CallLifecycleStatus | null
    initiatedAt: Date | null
    connectedAt: Date | null
    completedAt: Date | null
    failedAt: Date | null
    durationSec: number | null
    transcriptTurns: number | null
    recordingUrl: string | null
    lastError: string | null
    estimatedCost: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallSessionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    roomId: string | null
    phoneNumber: string | null
    agentName: string | null
    direction: string | null
    status: $Enums.CallLifecycleStatus | null
    initiatedAt: Date | null
    connectedAt: Date | null
    completedAt: Date | null
    failedAt: Date | null
    durationSec: number | null
    transcriptTurns: number | null
    recordingUrl: string | null
    lastError: string | null
    estimatedCost: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallSessionCountAggregateOutputType = {
    id: number
    tenantId: number
    roomId: number
    phoneNumber: number
    agentName: number
    direction: number
    status: number
    initiatedAt: number
    connectedAt: number
    completedAt: number
    failedAt: number
    durationSec: number
    transcriptTurns: number
    recordingUrl: number
    lastError: number
    estimatedCost: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CallSessionAvgAggregateInputType = {
    durationSec?: true
    transcriptTurns?: true
    estimatedCost?: true
  }

  export type CallSessionSumAggregateInputType = {
    durationSec?: true
    transcriptTurns?: true
    estimatedCost?: true
  }

  export type CallSessionMinAggregateInputType = {
    id?: true
    tenantId?: true
    roomId?: true
    phoneNumber?: true
    agentName?: true
    direction?: true
    status?: true
    initiatedAt?: true
    connectedAt?: true
    completedAt?: true
    failedAt?: true
    durationSec?: true
    transcriptTurns?: true
    recordingUrl?: true
    lastError?: true
    estimatedCost?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallSessionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    roomId?: true
    phoneNumber?: true
    agentName?: true
    direction?: true
    status?: true
    initiatedAt?: true
    connectedAt?: true
    completedAt?: true
    failedAt?: true
    durationSec?: true
    transcriptTurns?: true
    recordingUrl?: true
    lastError?: true
    estimatedCost?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallSessionCountAggregateInputType = {
    id?: true
    tenantId?: true
    roomId?: true
    phoneNumber?: true
    agentName?: true
    direction?: true
    status?: true
    initiatedAt?: true
    connectedAt?: true
    completedAt?: true
    failedAt?: true
    durationSec?: true
    transcriptTurns?: true
    recordingUrl?: true
    lastError?: true
    estimatedCost?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CallSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallSession to aggregate.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallSessions
    **/
    _count?: true | CallSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallSessionMaxAggregateInputType
  }

  export type GetCallSessionAggregateType<T extends CallSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCallSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallSession[P]>
      : GetScalarType<T[P], AggregateCallSession[P]>
  }




  export type CallSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallSessionWhereInput
    orderBy?: CallSessionOrderByWithAggregationInput | CallSessionOrderByWithAggregationInput[]
    by: CallSessionScalarFieldEnum[] | CallSessionScalarFieldEnum
    having?: CallSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallSessionCountAggregateInputType | true
    _avg?: CallSessionAvgAggregateInputType
    _sum?: CallSessionSumAggregateInputType
    _min?: CallSessionMinAggregateInputType
    _max?: CallSessionMaxAggregateInputType
  }

  export type CallSessionGroupByOutputType = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber: string | null
    agentName: string | null
    direction: string | null
    status: $Enums.CallLifecycleStatus
    initiatedAt: Date
    connectedAt: Date | null
    completedAt: Date | null
    failedAt: Date | null
    durationSec: number | null
    transcriptTurns: number | null
    recordingUrl: string | null
    lastError: string | null
    estimatedCost: number | null
    createdAt: Date
    updatedAt: Date
    _count: CallSessionCountAggregateOutputType | null
    _avg: CallSessionAvgAggregateOutputType | null
    _sum: CallSessionSumAggregateOutputType | null
    _min: CallSessionMinAggregateOutputType | null
    _max: CallSessionMaxAggregateOutputType | null
  }

  type GetCallSessionGroupByPayload<T extends CallSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CallSessionGroupByOutputType[P]>
        }
      >
    >


  export type CallSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    roomId?: boolean
    phoneNumber?: boolean
    agentName?: boolean
    direction?: boolean
    status?: boolean
    initiatedAt?: boolean
    connectedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    durationSec?: boolean
    transcriptTurns?: boolean
    recordingUrl?: boolean
    lastError?: boolean
    estimatedCost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    events?: boolean | CallSession$eventsArgs<ExtArgs>
    transcriptSegments?: boolean | CallSession$transcriptSegmentsArgs<ExtArgs>
    leadExtraction?: boolean | CallSession$leadExtractionArgs<ExtArgs>
    campaignLinks?: boolean | CallSession$campaignLinksArgs<ExtArgs>
    sourceContacts?: boolean | CallSession$sourceContactsArgs<ExtArgs>
    _count?: boolean | CallSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callSession"]>

  export type CallSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    roomId?: boolean
    phoneNumber?: boolean
    agentName?: boolean
    direction?: boolean
    status?: boolean
    initiatedAt?: boolean
    connectedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    durationSec?: boolean
    transcriptTurns?: boolean
    recordingUrl?: boolean
    lastError?: boolean
    estimatedCost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callSession"]>

  export type CallSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    roomId?: boolean
    phoneNumber?: boolean
    agentName?: boolean
    direction?: boolean
    status?: boolean
    initiatedAt?: boolean
    connectedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    durationSec?: boolean
    transcriptTurns?: boolean
    recordingUrl?: boolean
    lastError?: boolean
    estimatedCost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callSession"]>

  export type CallSessionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    roomId?: boolean
    phoneNumber?: boolean
    agentName?: boolean
    direction?: boolean
    status?: boolean
    initiatedAt?: boolean
    connectedAt?: boolean
    completedAt?: boolean
    failedAt?: boolean
    durationSec?: boolean
    transcriptTurns?: boolean
    recordingUrl?: boolean
    lastError?: boolean
    estimatedCost?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CallSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "roomId" | "phoneNumber" | "agentName" | "direction" | "status" | "initiatedAt" | "connectedAt" | "completedAt" | "failedAt" | "durationSec" | "transcriptTurns" | "recordingUrl" | "lastError" | "estimatedCost" | "createdAt" | "updatedAt", ExtArgs["result"]["callSession"]>
  export type CallSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    events?: boolean | CallSession$eventsArgs<ExtArgs>
    transcriptSegments?: boolean | CallSession$transcriptSegmentsArgs<ExtArgs>
    leadExtraction?: boolean | CallSession$leadExtractionArgs<ExtArgs>
    campaignLinks?: boolean | CallSession$campaignLinksArgs<ExtArgs>
    sourceContacts?: boolean | CallSession$sourceContactsArgs<ExtArgs>
    _count?: boolean | CallSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CallSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type CallSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $CallSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallSession"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      events: Prisma.$CallEventPayload<ExtArgs>[]
      transcriptSegments: Prisma.$TranscriptSegmentPayload<ExtArgs>[]
      leadExtraction: Prisma.$LeadExtractionPayload<ExtArgs> | null
      campaignLinks: Prisma.$CampaignCallPayload<ExtArgs>[]
      sourceContacts: Prisma.$CampaignContactPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      roomId: string
      phoneNumber: string | null
      agentName: string | null
      direction: string | null
      status: $Enums.CallLifecycleStatus
      initiatedAt: Date
      connectedAt: Date | null
      completedAt: Date | null
      failedAt: Date | null
      durationSec: number | null
      transcriptTurns: number | null
      recordingUrl: string | null
      lastError: string | null
      estimatedCost: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["callSession"]>
    composites: {}
  }

  type CallSessionGetPayload<S extends boolean | null | undefined | CallSessionDefaultArgs> = $Result.GetResult<Prisma.$CallSessionPayload, S>

  type CallSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallSessionCountAggregateInputType | true
    }

  export interface CallSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallSession'], meta: { name: 'CallSession' } }
    /**
     * Find zero or one CallSession that matches the filter.
     * @param {CallSessionFindUniqueArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallSessionFindUniqueArgs>(args: SelectSubset<T, CallSessionFindUniqueArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CallSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallSessionFindUniqueOrThrowArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CallSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionFindFirstArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallSessionFindFirstArgs>(args?: SelectSubset<T, CallSessionFindFirstArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionFindFirstOrThrowArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CallSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallSessions
     * const callSessions = await prisma.callSession.findMany()
     * 
     * // Get first 10 CallSessions
     * const callSessions = await prisma.callSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callSessionWithIdOnly = await prisma.callSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallSessionFindManyArgs>(args?: SelectSubset<T, CallSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CallSession.
     * @param {CallSessionCreateArgs} args - Arguments to create a CallSession.
     * @example
     * // Create one CallSession
     * const CallSession = await prisma.callSession.create({
     *   data: {
     *     // ... data to create a CallSession
     *   }
     * })
     * 
     */
    create<T extends CallSessionCreateArgs>(args: SelectSubset<T, CallSessionCreateArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CallSessions.
     * @param {CallSessionCreateManyArgs} args - Arguments to create many CallSessions.
     * @example
     * // Create many CallSessions
     * const callSession = await prisma.callSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallSessionCreateManyArgs>(args?: SelectSubset<T, CallSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallSessions and returns the data saved in the database.
     * @param {CallSessionCreateManyAndReturnArgs} args - Arguments to create many CallSessions.
     * @example
     * // Create many CallSessions
     * const callSession = await prisma.callSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallSessions and only return the `id`
     * const callSessionWithIdOnly = await prisma.callSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CallSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CallSession.
     * @param {CallSessionDeleteArgs} args - Arguments to delete one CallSession.
     * @example
     * // Delete one CallSession
     * const CallSession = await prisma.callSession.delete({
     *   where: {
     *     // ... filter to delete one CallSession
     *   }
     * })
     * 
     */
    delete<T extends CallSessionDeleteArgs>(args: SelectSubset<T, CallSessionDeleteArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CallSession.
     * @param {CallSessionUpdateArgs} args - Arguments to update one CallSession.
     * @example
     * // Update one CallSession
     * const callSession = await prisma.callSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallSessionUpdateArgs>(args: SelectSubset<T, CallSessionUpdateArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CallSessions.
     * @param {CallSessionDeleteManyArgs} args - Arguments to filter CallSessions to delete.
     * @example
     * // Delete a few CallSessions
     * const { count } = await prisma.callSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallSessionDeleteManyArgs>(args?: SelectSubset<T, CallSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallSessions
     * const callSession = await prisma.callSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallSessionUpdateManyArgs>(args: SelectSubset<T, CallSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallSessions and returns the data updated in the database.
     * @param {CallSessionUpdateManyAndReturnArgs} args - Arguments to update many CallSessions.
     * @example
     * // Update many CallSessions
     * const callSession = await prisma.callSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CallSessions and only return the `id`
     * const callSessionWithIdOnly = await prisma.callSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CallSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, CallSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CallSession.
     * @param {CallSessionUpsertArgs} args - Arguments to update or create a CallSession.
     * @example
     * // Update or create a CallSession
     * const callSession = await prisma.callSession.upsert({
     *   create: {
     *     // ... data to create a CallSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallSession we want to update
     *   }
     * })
     */
    upsert<T extends CallSessionUpsertArgs>(args: SelectSubset<T, CallSessionUpsertArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CallSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionCountArgs} args - Arguments to filter CallSessions to count.
     * @example
     * // Count the number of CallSessions
     * const count = await prisma.callSession.count({
     *   where: {
     *     // ... the filter for the CallSessions we want to count
     *   }
     * })
    **/
    count<T extends CallSessionCountArgs>(
      args?: Subset<T, CallSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallSessionAggregateArgs>(args: Subset<T, CallSessionAggregateArgs>): Prisma.PrismaPromise<GetCallSessionAggregateType<T>>

    /**
     * Group by CallSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallSessionGroupByArgs['orderBy'] }
        : { orderBy?: CallSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallSession model
   */
  readonly fields: CallSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    events<T extends CallSession$eventsArgs<ExtArgs> = {}>(args?: Subset<T, CallSession$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transcriptSegments<T extends CallSession$transcriptSegmentsArgs<ExtArgs> = {}>(args?: Subset<T, CallSession$transcriptSegmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leadExtraction<T extends CallSession$leadExtractionArgs<ExtArgs> = {}>(args?: Subset<T, CallSession$leadExtractionArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    campaignLinks<T extends CallSession$campaignLinksArgs<ExtArgs> = {}>(args?: Subset<T, CallSession$campaignLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sourceContacts<T extends CallSession$sourceContactsArgs<ExtArgs> = {}>(args?: Subset<T, CallSession$sourceContactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallSession model
   */
  interface CallSessionFieldRefs {
    readonly id: FieldRef<"CallSession", 'String'>
    readonly tenantId: FieldRef<"CallSession", 'String'>
    readonly roomId: FieldRef<"CallSession", 'String'>
    readonly phoneNumber: FieldRef<"CallSession", 'String'>
    readonly agentName: FieldRef<"CallSession", 'String'>
    readonly direction: FieldRef<"CallSession", 'String'>
    readonly status: FieldRef<"CallSession", 'CallLifecycleStatus'>
    readonly initiatedAt: FieldRef<"CallSession", 'DateTime'>
    readonly connectedAt: FieldRef<"CallSession", 'DateTime'>
    readonly completedAt: FieldRef<"CallSession", 'DateTime'>
    readonly failedAt: FieldRef<"CallSession", 'DateTime'>
    readonly durationSec: FieldRef<"CallSession", 'Float'>
    readonly transcriptTurns: FieldRef<"CallSession", 'Int'>
    readonly recordingUrl: FieldRef<"CallSession", 'String'>
    readonly lastError: FieldRef<"CallSession", 'String'>
    readonly estimatedCost: FieldRef<"CallSession", 'Float'>
    readonly createdAt: FieldRef<"CallSession", 'DateTime'>
    readonly updatedAt: FieldRef<"CallSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallSession findUnique
   */
  export type CallSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession findUniqueOrThrow
   */
  export type CallSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession findFirst
   */
  export type CallSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallSessions.
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallSessions.
     */
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * CallSession findFirstOrThrow
   */
  export type CallSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallSessions.
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallSessions.
     */
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * CallSession findMany
   */
  export type CallSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSessions to fetch.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallSessions.
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * CallSession create
   */
  export type CallSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CallSession.
     */
    data: XOR<CallSessionCreateInput, CallSessionUncheckedCreateInput>
  }

  /**
   * CallSession createMany
   */
  export type CallSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallSessions.
     */
    data: CallSessionCreateManyInput | CallSessionCreateManyInput[]
  }

  /**
   * CallSession createManyAndReturn
   */
  export type CallSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * The data used to create many CallSessions.
     */
    data: CallSessionCreateManyInput | CallSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallSession update
   */
  export type CallSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CallSession.
     */
    data: XOR<CallSessionUpdateInput, CallSessionUncheckedUpdateInput>
    /**
     * Choose, which CallSession to update.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession updateMany
   */
  export type CallSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallSessions.
     */
    data: XOR<CallSessionUpdateManyMutationInput, CallSessionUncheckedUpdateManyInput>
    /**
     * Filter which CallSessions to update
     */
    where?: CallSessionWhereInput
    /**
     * Limit how many CallSessions to update.
     */
    limit?: number
  }

  /**
   * CallSession updateManyAndReturn
   */
  export type CallSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * The data used to update CallSessions.
     */
    data: XOR<CallSessionUpdateManyMutationInput, CallSessionUncheckedUpdateManyInput>
    /**
     * Filter which CallSessions to update
     */
    where?: CallSessionWhereInput
    /**
     * Limit how many CallSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallSession upsert
   */
  export type CallSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CallSession to update in case it exists.
     */
    where: CallSessionWhereUniqueInput
    /**
     * In case the CallSession found by the `where` argument doesn't exist, create a new CallSession with this data.
     */
    create: XOR<CallSessionCreateInput, CallSessionUncheckedCreateInput>
    /**
     * In case the CallSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallSessionUpdateInput, CallSessionUncheckedUpdateInput>
  }

  /**
   * CallSession delete
   */
  export type CallSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter which CallSession to delete.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession deleteMany
   */
  export type CallSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallSessions to delete
     */
    where?: CallSessionWhereInput
    /**
     * Limit how many CallSessions to delete.
     */
    limit?: number
  }

  /**
   * CallSession.events
   */
  export type CallSession$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    where?: CallEventWhereInput
    orderBy?: CallEventOrderByWithRelationInput | CallEventOrderByWithRelationInput[]
    cursor?: CallEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallEventScalarFieldEnum | CallEventScalarFieldEnum[]
  }

  /**
   * CallSession.transcriptSegments
   */
  export type CallSession$transcriptSegmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    where?: TranscriptSegmentWhereInput
    orderBy?: TranscriptSegmentOrderByWithRelationInput | TranscriptSegmentOrderByWithRelationInput[]
    cursor?: TranscriptSegmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TranscriptSegmentScalarFieldEnum | TranscriptSegmentScalarFieldEnum[]
  }

  /**
   * CallSession.leadExtraction
   */
  export type CallSession$leadExtractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    where?: LeadExtractionWhereInput
  }

  /**
   * CallSession.campaignLinks
   */
  export type CallSession$campaignLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    where?: CampaignCallWhereInput
    orderBy?: CampaignCallOrderByWithRelationInput | CampaignCallOrderByWithRelationInput[]
    cursor?: CampaignCallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignCallScalarFieldEnum | CampaignCallScalarFieldEnum[]
  }

  /**
   * CallSession.sourceContacts
   */
  export type CallSession$sourceContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    where?: CampaignContactWhereInput
    orderBy?: CampaignContactOrderByWithRelationInput | CampaignContactOrderByWithRelationInput[]
    cursor?: CampaignContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignContactScalarFieldEnum | CampaignContactScalarFieldEnum[]
  }

  /**
   * CallSession without action
   */
  export type CallSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
  }


  /**
   * Model CallEvent
   */

  export type AggregateCallEvent = {
    _count: CallEventCountAggregateOutputType | null
    _min: CallEventMinAggregateOutputType | null
    _max: CallEventMaxAggregateOutputType | null
  }

  export type CallEventMinAggregateOutputType = {
    id: string | null
    callId: string | null
    tenantId: string | null
    eventType: string | null
    occurredAt: Date | null
    eventId: string | null
    payloadJson: string | null
    rawEnvelope: string | null
    rawHeaders: string | null
    createdAt: Date | null
  }

  export type CallEventMaxAggregateOutputType = {
    id: string | null
    callId: string | null
    tenantId: string | null
    eventType: string | null
    occurredAt: Date | null
    eventId: string | null
    payloadJson: string | null
    rawEnvelope: string | null
    rawHeaders: string | null
    createdAt: Date | null
  }

  export type CallEventCountAggregateOutputType = {
    id: number
    callId: number
    tenantId: number
    eventType: number
    occurredAt: number
    eventId: number
    payloadJson: number
    rawEnvelope: number
    rawHeaders: number
    createdAt: number
    _all: number
  }


  export type CallEventMinAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    eventType?: true
    occurredAt?: true
    eventId?: true
    payloadJson?: true
    rawEnvelope?: true
    rawHeaders?: true
    createdAt?: true
  }

  export type CallEventMaxAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    eventType?: true
    occurredAt?: true
    eventId?: true
    payloadJson?: true
    rawEnvelope?: true
    rawHeaders?: true
    createdAt?: true
  }

  export type CallEventCountAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    eventType?: true
    occurredAt?: true
    eventId?: true
    payloadJson?: true
    rawEnvelope?: true
    rawHeaders?: true
    createdAt?: true
    _all?: true
  }

  export type CallEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallEvent to aggregate.
     */
    where?: CallEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEvents to fetch.
     */
    orderBy?: CallEventOrderByWithRelationInput | CallEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallEvents
    **/
    _count?: true | CallEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallEventMaxAggregateInputType
  }

  export type GetCallEventAggregateType<T extends CallEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCallEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallEvent[P]>
      : GetScalarType<T[P], AggregateCallEvent[P]>
  }




  export type CallEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallEventWhereInput
    orderBy?: CallEventOrderByWithAggregationInput | CallEventOrderByWithAggregationInput[]
    by: CallEventScalarFieldEnum[] | CallEventScalarFieldEnum
    having?: CallEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallEventCountAggregateInputType | true
    _min?: CallEventMinAggregateInputType
    _max?: CallEventMaxAggregateInputType
  }

  export type CallEventGroupByOutputType = {
    id: string
    callId: string
    tenantId: string
    eventType: string
    occurredAt: Date
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt: Date
    _count: CallEventCountAggregateOutputType | null
    _min: CallEventMinAggregateOutputType | null
    _max: CallEventMaxAggregateOutputType | null
  }

  type GetCallEventGroupByPayload<T extends CallEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallEventGroupByOutputType[P]>
            : GetScalarType<T[P], CallEventGroupByOutputType[P]>
        }
      >
    >


  export type CallEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    eventId?: boolean
    payloadJson?: boolean
    rawEnvelope?: boolean
    rawHeaders?: boolean
    createdAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callEvent"]>

  export type CallEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    eventId?: boolean
    payloadJson?: boolean
    rawEnvelope?: boolean
    rawHeaders?: boolean
    createdAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callEvent"]>

  export type CallEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    eventId?: boolean
    payloadJson?: boolean
    rawEnvelope?: boolean
    rawHeaders?: boolean
    createdAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callEvent"]>

  export type CallEventSelectScalar = {
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    eventId?: boolean
    payloadJson?: boolean
    rawEnvelope?: boolean
    rawHeaders?: boolean
    createdAt?: boolean
  }

  export type CallEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callId" | "tenantId" | "eventType" | "occurredAt" | "eventId" | "payloadJson" | "rawEnvelope" | "rawHeaders" | "createdAt", ExtArgs["result"]["callEvent"]>
  export type CallEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type CallEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type CallEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }

  export type $CallEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallEvent"
    objects: {
      callSession: Prisma.$CallSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      callId: string
      tenantId: string
      eventType: string
      occurredAt: Date
      eventId: string
      payloadJson: string
      rawEnvelope: string
      rawHeaders: string
      createdAt: Date
    }, ExtArgs["result"]["callEvent"]>
    composites: {}
  }

  type CallEventGetPayload<S extends boolean | null | undefined | CallEventDefaultArgs> = $Result.GetResult<Prisma.$CallEventPayload, S>

  type CallEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallEventCountAggregateInputType | true
    }

  export interface CallEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallEvent'], meta: { name: 'CallEvent' } }
    /**
     * Find zero or one CallEvent that matches the filter.
     * @param {CallEventFindUniqueArgs} args - Arguments to find a CallEvent
     * @example
     * // Get one CallEvent
     * const callEvent = await prisma.callEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallEventFindUniqueArgs>(args: SelectSubset<T, CallEventFindUniqueArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CallEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallEventFindUniqueOrThrowArgs} args - Arguments to find a CallEvent
     * @example
     * // Get one CallEvent
     * const callEvent = await prisma.callEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CallEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventFindFirstArgs} args - Arguments to find a CallEvent
     * @example
     * // Get one CallEvent
     * const callEvent = await prisma.callEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallEventFindFirstArgs>(args?: SelectSubset<T, CallEventFindFirstArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventFindFirstOrThrowArgs} args - Arguments to find a CallEvent
     * @example
     * // Get one CallEvent
     * const callEvent = await prisma.callEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CallEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallEvents
     * const callEvents = await prisma.callEvent.findMany()
     * 
     * // Get first 10 CallEvents
     * const callEvents = await prisma.callEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callEventWithIdOnly = await prisma.callEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallEventFindManyArgs>(args?: SelectSubset<T, CallEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CallEvent.
     * @param {CallEventCreateArgs} args - Arguments to create a CallEvent.
     * @example
     * // Create one CallEvent
     * const CallEvent = await prisma.callEvent.create({
     *   data: {
     *     // ... data to create a CallEvent
     *   }
     * })
     * 
     */
    create<T extends CallEventCreateArgs>(args: SelectSubset<T, CallEventCreateArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CallEvents.
     * @param {CallEventCreateManyArgs} args - Arguments to create many CallEvents.
     * @example
     * // Create many CallEvents
     * const callEvent = await prisma.callEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallEventCreateManyArgs>(args?: SelectSubset<T, CallEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallEvents and returns the data saved in the database.
     * @param {CallEventCreateManyAndReturnArgs} args - Arguments to create many CallEvents.
     * @example
     * // Create many CallEvents
     * const callEvent = await prisma.callEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallEvents and only return the `id`
     * const callEventWithIdOnly = await prisma.callEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CallEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CallEvent.
     * @param {CallEventDeleteArgs} args - Arguments to delete one CallEvent.
     * @example
     * // Delete one CallEvent
     * const CallEvent = await prisma.callEvent.delete({
     *   where: {
     *     // ... filter to delete one CallEvent
     *   }
     * })
     * 
     */
    delete<T extends CallEventDeleteArgs>(args: SelectSubset<T, CallEventDeleteArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CallEvent.
     * @param {CallEventUpdateArgs} args - Arguments to update one CallEvent.
     * @example
     * // Update one CallEvent
     * const callEvent = await prisma.callEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallEventUpdateArgs>(args: SelectSubset<T, CallEventUpdateArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CallEvents.
     * @param {CallEventDeleteManyArgs} args - Arguments to filter CallEvents to delete.
     * @example
     * // Delete a few CallEvents
     * const { count } = await prisma.callEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallEventDeleteManyArgs>(args?: SelectSubset<T, CallEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallEvents
     * const callEvent = await prisma.callEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallEventUpdateManyArgs>(args: SelectSubset<T, CallEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallEvents and returns the data updated in the database.
     * @param {CallEventUpdateManyAndReturnArgs} args - Arguments to update many CallEvents.
     * @example
     * // Update many CallEvents
     * const callEvent = await prisma.callEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CallEvents and only return the `id`
     * const callEventWithIdOnly = await prisma.callEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CallEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CallEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CallEvent.
     * @param {CallEventUpsertArgs} args - Arguments to update or create a CallEvent.
     * @example
     * // Update or create a CallEvent
     * const callEvent = await prisma.callEvent.upsert({
     *   create: {
     *     // ... data to create a CallEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallEvent we want to update
     *   }
     * })
     */
    upsert<T extends CallEventUpsertArgs>(args: SelectSubset<T, CallEventUpsertArgs<ExtArgs>>): Prisma__CallEventClient<$Result.GetResult<Prisma.$CallEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CallEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventCountArgs} args - Arguments to filter CallEvents to count.
     * @example
     * // Count the number of CallEvents
     * const count = await prisma.callEvent.count({
     *   where: {
     *     // ... the filter for the CallEvents we want to count
     *   }
     * })
    **/
    count<T extends CallEventCountArgs>(
      args?: Subset<T, CallEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallEventAggregateArgs>(args: Subset<T, CallEventAggregateArgs>): Prisma.PrismaPromise<GetCallEventAggregateType<T>>

    /**
     * Group by CallEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallEventGroupByArgs['orderBy'] }
        : { orderBy?: CallEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallEvent model
   */
  readonly fields: CallEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    callSession<T extends CallSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CallSessionDefaultArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallEvent model
   */
  interface CallEventFieldRefs {
    readonly id: FieldRef<"CallEvent", 'String'>
    readonly callId: FieldRef<"CallEvent", 'String'>
    readonly tenantId: FieldRef<"CallEvent", 'String'>
    readonly eventType: FieldRef<"CallEvent", 'String'>
    readonly occurredAt: FieldRef<"CallEvent", 'DateTime'>
    readonly eventId: FieldRef<"CallEvent", 'String'>
    readonly payloadJson: FieldRef<"CallEvent", 'String'>
    readonly rawEnvelope: FieldRef<"CallEvent", 'String'>
    readonly rawHeaders: FieldRef<"CallEvent", 'String'>
    readonly createdAt: FieldRef<"CallEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallEvent findUnique
   */
  export type CallEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * Filter, which CallEvent to fetch.
     */
    where: CallEventWhereUniqueInput
  }

  /**
   * CallEvent findUniqueOrThrow
   */
  export type CallEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * Filter, which CallEvent to fetch.
     */
    where: CallEventWhereUniqueInput
  }

  /**
   * CallEvent findFirst
   */
  export type CallEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * Filter, which CallEvent to fetch.
     */
    where?: CallEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEvents to fetch.
     */
    orderBy?: CallEventOrderByWithRelationInput | CallEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallEvents.
     */
    cursor?: CallEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallEvents.
     */
    distinct?: CallEventScalarFieldEnum | CallEventScalarFieldEnum[]
  }

  /**
   * CallEvent findFirstOrThrow
   */
  export type CallEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * Filter, which CallEvent to fetch.
     */
    where?: CallEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEvents to fetch.
     */
    orderBy?: CallEventOrderByWithRelationInput | CallEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallEvents.
     */
    cursor?: CallEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallEvents.
     */
    distinct?: CallEventScalarFieldEnum | CallEventScalarFieldEnum[]
  }

  /**
   * CallEvent findMany
   */
  export type CallEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * Filter, which CallEvents to fetch.
     */
    where?: CallEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEvents to fetch.
     */
    orderBy?: CallEventOrderByWithRelationInput | CallEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallEvents.
     */
    cursor?: CallEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEvents.
     */
    skip?: number
    distinct?: CallEventScalarFieldEnum | CallEventScalarFieldEnum[]
  }

  /**
   * CallEvent create
   */
  export type CallEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CallEvent.
     */
    data: XOR<CallEventCreateInput, CallEventUncheckedCreateInput>
  }

  /**
   * CallEvent createMany
   */
  export type CallEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallEvents.
     */
    data: CallEventCreateManyInput | CallEventCreateManyInput[]
  }

  /**
   * CallEvent createManyAndReturn
   */
  export type CallEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * The data used to create many CallEvents.
     */
    data: CallEventCreateManyInput | CallEventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallEvent update
   */
  export type CallEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CallEvent.
     */
    data: XOR<CallEventUpdateInput, CallEventUncheckedUpdateInput>
    /**
     * Choose, which CallEvent to update.
     */
    where: CallEventWhereUniqueInput
  }

  /**
   * CallEvent updateMany
   */
  export type CallEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallEvents.
     */
    data: XOR<CallEventUpdateManyMutationInput, CallEventUncheckedUpdateManyInput>
    /**
     * Filter which CallEvents to update
     */
    where?: CallEventWhereInput
    /**
     * Limit how many CallEvents to update.
     */
    limit?: number
  }

  /**
   * CallEvent updateManyAndReturn
   */
  export type CallEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * The data used to update CallEvents.
     */
    data: XOR<CallEventUpdateManyMutationInput, CallEventUncheckedUpdateManyInput>
    /**
     * Filter which CallEvents to update
     */
    where?: CallEventWhereInput
    /**
     * Limit how many CallEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallEvent upsert
   */
  export type CallEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CallEvent to update in case it exists.
     */
    where: CallEventWhereUniqueInput
    /**
     * In case the CallEvent found by the `where` argument doesn't exist, create a new CallEvent with this data.
     */
    create: XOR<CallEventCreateInput, CallEventUncheckedCreateInput>
    /**
     * In case the CallEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallEventUpdateInput, CallEventUncheckedUpdateInput>
  }

  /**
   * CallEvent delete
   */
  export type CallEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
    /**
     * Filter which CallEvent to delete.
     */
    where: CallEventWhereUniqueInput
  }

  /**
   * CallEvent deleteMany
   */
  export type CallEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallEvents to delete
     */
    where?: CallEventWhereInput
    /**
     * Limit how many CallEvents to delete.
     */
    limit?: number
  }

  /**
   * CallEvent without action
   */
  export type CallEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEvent
     */
    select?: CallEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEvent
     */
    omit?: CallEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallEventInclude<ExtArgs> | null
  }


  /**
   * Model TranscriptSegment
   */

  export type AggregateTranscriptSegment = {
    _count: TranscriptSegmentCountAggregateOutputType | null
    _avg: TranscriptSegmentAvgAggregateOutputType | null
    _sum: TranscriptSegmentSumAggregateOutputType | null
    _min: TranscriptSegmentMinAggregateOutputType | null
    _max: TranscriptSegmentMaxAggregateOutputType | null
  }

  export type TranscriptSegmentAvgAggregateOutputType = {
    sequenceNo: number | null
  }

  export type TranscriptSegmentSumAggregateOutputType = {
    sequenceNo: number | null
  }

  export type TranscriptSegmentMinAggregateOutputType = {
    id: string | null
    callId: string | null
    tenantId: string | null
    speaker: $Enums.Speaker | null
    text: string | null
    isFinal: boolean | null
    sequenceNo: number | null
    providerMessageId: string | null
    rawJson: string | null
    occurredAt: Date | null
    createdAt: Date | null
  }

  export type TranscriptSegmentMaxAggregateOutputType = {
    id: string | null
    callId: string | null
    tenantId: string | null
    speaker: $Enums.Speaker | null
    text: string | null
    isFinal: boolean | null
    sequenceNo: number | null
    providerMessageId: string | null
    rawJson: string | null
    occurredAt: Date | null
    createdAt: Date | null
  }

  export type TranscriptSegmentCountAggregateOutputType = {
    id: number
    callId: number
    tenantId: number
    speaker: number
    text: number
    isFinal: number
    sequenceNo: number
    providerMessageId: number
    rawJson: number
    occurredAt: number
    createdAt: number
    _all: number
  }


  export type TranscriptSegmentAvgAggregateInputType = {
    sequenceNo?: true
  }

  export type TranscriptSegmentSumAggregateInputType = {
    sequenceNo?: true
  }

  export type TranscriptSegmentMinAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    speaker?: true
    text?: true
    isFinal?: true
    sequenceNo?: true
    providerMessageId?: true
    rawJson?: true
    occurredAt?: true
    createdAt?: true
  }

  export type TranscriptSegmentMaxAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    speaker?: true
    text?: true
    isFinal?: true
    sequenceNo?: true
    providerMessageId?: true
    rawJson?: true
    occurredAt?: true
    createdAt?: true
  }

  export type TranscriptSegmentCountAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    speaker?: true
    text?: true
    isFinal?: true
    sequenceNo?: true
    providerMessageId?: true
    rawJson?: true
    occurredAt?: true
    createdAt?: true
    _all?: true
  }

  export type TranscriptSegmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TranscriptSegment to aggregate.
     */
    where?: TranscriptSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TranscriptSegments to fetch.
     */
    orderBy?: TranscriptSegmentOrderByWithRelationInput | TranscriptSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TranscriptSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TranscriptSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TranscriptSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TranscriptSegments
    **/
    _count?: true | TranscriptSegmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TranscriptSegmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TranscriptSegmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TranscriptSegmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TranscriptSegmentMaxAggregateInputType
  }

  export type GetTranscriptSegmentAggregateType<T extends TranscriptSegmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTranscriptSegment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTranscriptSegment[P]>
      : GetScalarType<T[P], AggregateTranscriptSegment[P]>
  }




  export type TranscriptSegmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranscriptSegmentWhereInput
    orderBy?: TranscriptSegmentOrderByWithAggregationInput | TranscriptSegmentOrderByWithAggregationInput[]
    by: TranscriptSegmentScalarFieldEnum[] | TranscriptSegmentScalarFieldEnum
    having?: TranscriptSegmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TranscriptSegmentCountAggregateInputType | true
    _avg?: TranscriptSegmentAvgAggregateInputType
    _sum?: TranscriptSegmentSumAggregateInputType
    _min?: TranscriptSegmentMinAggregateInputType
    _max?: TranscriptSegmentMaxAggregateInputType
  }

  export type TranscriptSegmentGroupByOutputType = {
    id: string
    callId: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal: boolean
    sequenceNo: number
    providerMessageId: string | null
    rawJson: string | null
    occurredAt: Date
    createdAt: Date
    _count: TranscriptSegmentCountAggregateOutputType | null
    _avg: TranscriptSegmentAvgAggregateOutputType | null
    _sum: TranscriptSegmentSumAggregateOutputType | null
    _min: TranscriptSegmentMinAggregateOutputType | null
    _max: TranscriptSegmentMaxAggregateOutputType | null
  }

  type GetTranscriptSegmentGroupByPayload<T extends TranscriptSegmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TranscriptSegmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TranscriptSegmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TranscriptSegmentGroupByOutputType[P]>
            : GetScalarType<T[P], TranscriptSegmentGroupByOutputType[P]>
        }
      >
    >


  export type TranscriptSegmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    speaker?: boolean
    text?: boolean
    isFinal?: boolean
    sequenceNo?: boolean
    providerMessageId?: boolean
    rawJson?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcriptSegment"]>

  export type TranscriptSegmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    speaker?: boolean
    text?: boolean
    isFinal?: boolean
    sequenceNo?: boolean
    providerMessageId?: boolean
    rawJson?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcriptSegment"]>

  export type TranscriptSegmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    speaker?: boolean
    text?: boolean
    isFinal?: boolean
    sequenceNo?: boolean
    providerMessageId?: boolean
    rawJson?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcriptSegment"]>

  export type TranscriptSegmentSelectScalar = {
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    speaker?: boolean
    text?: boolean
    isFinal?: boolean
    sequenceNo?: boolean
    providerMessageId?: boolean
    rawJson?: boolean
    occurredAt?: boolean
    createdAt?: boolean
  }

  export type TranscriptSegmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callId" | "tenantId" | "speaker" | "text" | "isFinal" | "sequenceNo" | "providerMessageId" | "rawJson" | "occurredAt" | "createdAt", ExtArgs["result"]["transcriptSegment"]>
  export type TranscriptSegmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type TranscriptSegmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type TranscriptSegmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }

  export type $TranscriptSegmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TranscriptSegment"
    objects: {
      callSession: Prisma.$CallSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      callId: string
      tenantId: string
      speaker: $Enums.Speaker
      text: string
      isFinal: boolean
      sequenceNo: number
      providerMessageId: string | null
      rawJson: string | null
      occurredAt: Date
      createdAt: Date
    }, ExtArgs["result"]["transcriptSegment"]>
    composites: {}
  }

  type TranscriptSegmentGetPayload<S extends boolean | null | undefined | TranscriptSegmentDefaultArgs> = $Result.GetResult<Prisma.$TranscriptSegmentPayload, S>

  type TranscriptSegmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TranscriptSegmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TranscriptSegmentCountAggregateInputType | true
    }

  export interface TranscriptSegmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TranscriptSegment'], meta: { name: 'TranscriptSegment' } }
    /**
     * Find zero or one TranscriptSegment that matches the filter.
     * @param {TranscriptSegmentFindUniqueArgs} args - Arguments to find a TranscriptSegment
     * @example
     * // Get one TranscriptSegment
     * const transcriptSegment = await prisma.transcriptSegment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TranscriptSegmentFindUniqueArgs>(args: SelectSubset<T, TranscriptSegmentFindUniqueArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TranscriptSegment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TranscriptSegmentFindUniqueOrThrowArgs} args - Arguments to find a TranscriptSegment
     * @example
     * // Get one TranscriptSegment
     * const transcriptSegment = await prisma.transcriptSegment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TranscriptSegmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TranscriptSegmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TranscriptSegment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentFindFirstArgs} args - Arguments to find a TranscriptSegment
     * @example
     * // Get one TranscriptSegment
     * const transcriptSegment = await prisma.transcriptSegment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TranscriptSegmentFindFirstArgs>(args?: SelectSubset<T, TranscriptSegmentFindFirstArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TranscriptSegment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentFindFirstOrThrowArgs} args - Arguments to find a TranscriptSegment
     * @example
     * // Get one TranscriptSegment
     * const transcriptSegment = await prisma.transcriptSegment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TranscriptSegmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TranscriptSegmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TranscriptSegments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TranscriptSegments
     * const transcriptSegments = await prisma.transcriptSegment.findMany()
     * 
     * // Get first 10 TranscriptSegments
     * const transcriptSegments = await prisma.transcriptSegment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transcriptSegmentWithIdOnly = await prisma.transcriptSegment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TranscriptSegmentFindManyArgs>(args?: SelectSubset<T, TranscriptSegmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TranscriptSegment.
     * @param {TranscriptSegmentCreateArgs} args - Arguments to create a TranscriptSegment.
     * @example
     * // Create one TranscriptSegment
     * const TranscriptSegment = await prisma.transcriptSegment.create({
     *   data: {
     *     // ... data to create a TranscriptSegment
     *   }
     * })
     * 
     */
    create<T extends TranscriptSegmentCreateArgs>(args: SelectSubset<T, TranscriptSegmentCreateArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TranscriptSegments.
     * @param {TranscriptSegmentCreateManyArgs} args - Arguments to create many TranscriptSegments.
     * @example
     * // Create many TranscriptSegments
     * const transcriptSegment = await prisma.transcriptSegment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TranscriptSegmentCreateManyArgs>(args?: SelectSubset<T, TranscriptSegmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TranscriptSegments and returns the data saved in the database.
     * @param {TranscriptSegmentCreateManyAndReturnArgs} args - Arguments to create many TranscriptSegments.
     * @example
     * // Create many TranscriptSegments
     * const transcriptSegment = await prisma.transcriptSegment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TranscriptSegments and only return the `id`
     * const transcriptSegmentWithIdOnly = await prisma.transcriptSegment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TranscriptSegmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TranscriptSegmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TranscriptSegment.
     * @param {TranscriptSegmentDeleteArgs} args - Arguments to delete one TranscriptSegment.
     * @example
     * // Delete one TranscriptSegment
     * const TranscriptSegment = await prisma.transcriptSegment.delete({
     *   where: {
     *     // ... filter to delete one TranscriptSegment
     *   }
     * })
     * 
     */
    delete<T extends TranscriptSegmentDeleteArgs>(args: SelectSubset<T, TranscriptSegmentDeleteArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TranscriptSegment.
     * @param {TranscriptSegmentUpdateArgs} args - Arguments to update one TranscriptSegment.
     * @example
     * // Update one TranscriptSegment
     * const transcriptSegment = await prisma.transcriptSegment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TranscriptSegmentUpdateArgs>(args: SelectSubset<T, TranscriptSegmentUpdateArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TranscriptSegments.
     * @param {TranscriptSegmentDeleteManyArgs} args - Arguments to filter TranscriptSegments to delete.
     * @example
     * // Delete a few TranscriptSegments
     * const { count } = await prisma.transcriptSegment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TranscriptSegmentDeleteManyArgs>(args?: SelectSubset<T, TranscriptSegmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TranscriptSegments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TranscriptSegments
     * const transcriptSegment = await prisma.transcriptSegment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TranscriptSegmentUpdateManyArgs>(args: SelectSubset<T, TranscriptSegmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TranscriptSegments and returns the data updated in the database.
     * @param {TranscriptSegmentUpdateManyAndReturnArgs} args - Arguments to update many TranscriptSegments.
     * @example
     * // Update many TranscriptSegments
     * const transcriptSegment = await prisma.transcriptSegment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TranscriptSegments and only return the `id`
     * const transcriptSegmentWithIdOnly = await prisma.transcriptSegment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TranscriptSegmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TranscriptSegmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TranscriptSegment.
     * @param {TranscriptSegmentUpsertArgs} args - Arguments to update or create a TranscriptSegment.
     * @example
     * // Update or create a TranscriptSegment
     * const transcriptSegment = await prisma.transcriptSegment.upsert({
     *   create: {
     *     // ... data to create a TranscriptSegment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TranscriptSegment we want to update
     *   }
     * })
     */
    upsert<T extends TranscriptSegmentUpsertArgs>(args: SelectSubset<T, TranscriptSegmentUpsertArgs<ExtArgs>>): Prisma__TranscriptSegmentClient<$Result.GetResult<Prisma.$TranscriptSegmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TranscriptSegments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentCountArgs} args - Arguments to filter TranscriptSegments to count.
     * @example
     * // Count the number of TranscriptSegments
     * const count = await prisma.transcriptSegment.count({
     *   where: {
     *     // ... the filter for the TranscriptSegments we want to count
     *   }
     * })
    **/
    count<T extends TranscriptSegmentCountArgs>(
      args?: Subset<T, TranscriptSegmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TranscriptSegmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TranscriptSegment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TranscriptSegmentAggregateArgs>(args: Subset<T, TranscriptSegmentAggregateArgs>): Prisma.PrismaPromise<GetTranscriptSegmentAggregateType<T>>

    /**
     * Group by TranscriptSegment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptSegmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TranscriptSegmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TranscriptSegmentGroupByArgs['orderBy'] }
        : { orderBy?: TranscriptSegmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TranscriptSegmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTranscriptSegmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TranscriptSegment model
   */
  readonly fields: TranscriptSegmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TranscriptSegment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TranscriptSegmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    callSession<T extends CallSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CallSessionDefaultArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TranscriptSegment model
   */
  interface TranscriptSegmentFieldRefs {
    readonly id: FieldRef<"TranscriptSegment", 'String'>
    readonly callId: FieldRef<"TranscriptSegment", 'String'>
    readonly tenantId: FieldRef<"TranscriptSegment", 'String'>
    readonly speaker: FieldRef<"TranscriptSegment", 'Speaker'>
    readonly text: FieldRef<"TranscriptSegment", 'String'>
    readonly isFinal: FieldRef<"TranscriptSegment", 'Boolean'>
    readonly sequenceNo: FieldRef<"TranscriptSegment", 'Int'>
    readonly providerMessageId: FieldRef<"TranscriptSegment", 'String'>
    readonly rawJson: FieldRef<"TranscriptSegment", 'String'>
    readonly occurredAt: FieldRef<"TranscriptSegment", 'DateTime'>
    readonly createdAt: FieldRef<"TranscriptSegment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TranscriptSegment findUnique
   */
  export type TranscriptSegmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * Filter, which TranscriptSegment to fetch.
     */
    where: TranscriptSegmentWhereUniqueInput
  }

  /**
   * TranscriptSegment findUniqueOrThrow
   */
  export type TranscriptSegmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * Filter, which TranscriptSegment to fetch.
     */
    where: TranscriptSegmentWhereUniqueInput
  }

  /**
   * TranscriptSegment findFirst
   */
  export type TranscriptSegmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * Filter, which TranscriptSegment to fetch.
     */
    where?: TranscriptSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TranscriptSegments to fetch.
     */
    orderBy?: TranscriptSegmentOrderByWithRelationInput | TranscriptSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TranscriptSegments.
     */
    cursor?: TranscriptSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TranscriptSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TranscriptSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TranscriptSegments.
     */
    distinct?: TranscriptSegmentScalarFieldEnum | TranscriptSegmentScalarFieldEnum[]
  }

  /**
   * TranscriptSegment findFirstOrThrow
   */
  export type TranscriptSegmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * Filter, which TranscriptSegment to fetch.
     */
    where?: TranscriptSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TranscriptSegments to fetch.
     */
    orderBy?: TranscriptSegmentOrderByWithRelationInput | TranscriptSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TranscriptSegments.
     */
    cursor?: TranscriptSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TranscriptSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TranscriptSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TranscriptSegments.
     */
    distinct?: TranscriptSegmentScalarFieldEnum | TranscriptSegmentScalarFieldEnum[]
  }

  /**
   * TranscriptSegment findMany
   */
  export type TranscriptSegmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * Filter, which TranscriptSegments to fetch.
     */
    where?: TranscriptSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TranscriptSegments to fetch.
     */
    orderBy?: TranscriptSegmentOrderByWithRelationInput | TranscriptSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TranscriptSegments.
     */
    cursor?: TranscriptSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TranscriptSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TranscriptSegments.
     */
    skip?: number
    distinct?: TranscriptSegmentScalarFieldEnum | TranscriptSegmentScalarFieldEnum[]
  }

  /**
   * TranscriptSegment create
   */
  export type TranscriptSegmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * The data needed to create a TranscriptSegment.
     */
    data: XOR<TranscriptSegmentCreateInput, TranscriptSegmentUncheckedCreateInput>
  }

  /**
   * TranscriptSegment createMany
   */
  export type TranscriptSegmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TranscriptSegments.
     */
    data: TranscriptSegmentCreateManyInput | TranscriptSegmentCreateManyInput[]
  }

  /**
   * TranscriptSegment createManyAndReturn
   */
  export type TranscriptSegmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * The data used to create many TranscriptSegments.
     */
    data: TranscriptSegmentCreateManyInput | TranscriptSegmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TranscriptSegment update
   */
  export type TranscriptSegmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * The data needed to update a TranscriptSegment.
     */
    data: XOR<TranscriptSegmentUpdateInput, TranscriptSegmentUncheckedUpdateInput>
    /**
     * Choose, which TranscriptSegment to update.
     */
    where: TranscriptSegmentWhereUniqueInput
  }

  /**
   * TranscriptSegment updateMany
   */
  export type TranscriptSegmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TranscriptSegments.
     */
    data: XOR<TranscriptSegmentUpdateManyMutationInput, TranscriptSegmentUncheckedUpdateManyInput>
    /**
     * Filter which TranscriptSegments to update
     */
    where?: TranscriptSegmentWhereInput
    /**
     * Limit how many TranscriptSegments to update.
     */
    limit?: number
  }

  /**
   * TranscriptSegment updateManyAndReturn
   */
  export type TranscriptSegmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * The data used to update TranscriptSegments.
     */
    data: XOR<TranscriptSegmentUpdateManyMutationInput, TranscriptSegmentUncheckedUpdateManyInput>
    /**
     * Filter which TranscriptSegments to update
     */
    where?: TranscriptSegmentWhereInput
    /**
     * Limit how many TranscriptSegments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TranscriptSegment upsert
   */
  export type TranscriptSegmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * The filter to search for the TranscriptSegment to update in case it exists.
     */
    where: TranscriptSegmentWhereUniqueInput
    /**
     * In case the TranscriptSegment found by the `where` argument doesn't exist, create a new TranscriptSegment with this data.
     */
    create: XOR<TranscriptSegmentCreateInput, TranscriptSegmentUncheckedCreateInput>
    /**
     * In case the TranscriptSegment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TranscriptSegmentUpdateInput, TranscriptSegmentUncheckedUpdateInput>
  }

  /**
   * TranscriptSegment delete
   */
  export type TranscriptSegmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
    /**
     * Filter which TranscriptSegment to delete.
     */
    where: TranscriptSegmentWhereUniqueInput
  }

  /**
   * TranscriptSegment deleteMany
   */
  export type TranscriptSegmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TranscriptSegments to delete
     */
    where?: TranscriptSegmentWhereInput
    /**
     * Limit how many TranscriptSegments to delete.
     */
    limit?: number
  }

  /**
   * TranscriptSegment without action
   */
  export type TranscriptSegmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TranscriptSegment
     */
    select?: TranscriptSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TranscriptSegment
     */
    omit?: TranscriptSegmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptSegmentInclude<ExtArgs> | null
  }


  /**
   * Model LeadExtraction
   */

  export type AggregateLeadExtraction = {
    _count: LeadExtractionCountAggregateOutputType | null
    _avg: LeadExtractionAvgAggregateOutputType | null
    _sum: LeadExtractionSumAggregateOutputType | null
    _min: LeadExtractionMinAggregateOutputType | null
    _max: LeadExtractionMaxAggregateOutputType | null
  }

  export type LeadExtractionAvgAggregateOutputType = {
    confidence: number | null
  }

  export type LeadExtractionSumAggregateOutputType = {
    confidence: number | null
  }

  export type LeadExtractionMinAggregateOutputType = {
    id: string | null
    callId: string | null
    tenantId: string | null
    extractedAt: Date | null
    name: string | null
    phone: string | null
    summary: string | null
    confidence: number | null
    rawJson: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadExtractionMaxAggregateOutputType = {
    id: string | null
    callId: string | null
    tenantId: string | null
    extractedAt: Date | null
    name: string | null
    phone: string | null
    summary: string | null
    confidence: number | null
    rawJson: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadExtractionCountAggregateOutputType = {
    id: number
    callId: number
    tenantId: number
    extractedAt: number
    name: number
    phone: number
    summary: number
    confidence: number
    rawJson: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadExtractionAvgAggregateInputType = {
    confidence?: true
  }

  export type LeadExtractionSumAggregateInputType = {
    confidence?: true
  }

  export type LeadExtractionMinAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    extractedAt?: true
    name?: true
    phone?: true
    summary?: true
    confidence?: true
    rawJson?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadExtractionMaxAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    extractedAt?: true
    name?: true
    phone?: true
    summary?: true
    confidence?: true
    rawJson?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadExtractionCountAggregateInputType = {
    id?: true
    callId?: true
    tenantId?: true
    extractedAt?: true
    name?: true
    phone?: true
    summary?: true
    confidence?: true
    rawJson?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadExtractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadExtraction to aggregate.
     */
    where?: LeadExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadExtractions to fetch.
     */
    orderBy?: LeadExtractionOrderByWithRelationInput | LeadExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadExtractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadExtractions
    **/
    _count?: true | LeadExtractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadExtractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadExtractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadExtractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadExtractionMaxAggregateInputType
  }

  export type GetLeadExtractionAggregateType<T extends LeadExtractionAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadExtraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadExtraction[P]>
      : GetScalarType<T[P], AggregateLeadExtraction[P]>
  }




  export type LeadExtractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadExtractionWhereInput
    orderBy?: LeadExtractionOrderByWithAggregationInput | LeadExtractionOrderByWithAggregationInput[]
    by: LeadExtractionScalarFieldEnum[] | LeadExtractionScalarFieldEnum
    having?: LeadExtractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadExtractionCountAggregateInputType | true
    _avg?: LeadExtractionAvgAggregateInputType
    _sum?: LeadExtractionSumAggregateInputType
    _min?: LeadExtractionMinAggregateInputType
    _max?: LeadExtractionMaxAggregateInputType
  }

  export type LeadExtractionGroupByOutputType = {
    id: string
    callId: string
    tenantId: string
    extractedAt: Date
    name: string | null
    phone: string | null
    summary: string
    confidence: number | null
    rawJson: string | null
    createdAt: Date
    updatedAt: Date
    _count: LeadExtractionCountAggregateOutputType | null
    _avg: LeadExtractionAvgAggregateOutputType | null
    _sum: LeadExtractionSumAggregateOutputType | null
    _min: LeadExtractionMinAggregateOutputType | null
    _max: LeadExtractionMaxAggregateOutputType | null
  }

  type GetLeadExtractionGroupByPayload<T extends LeadExtractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadExtractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadExtractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadExtractionGroupByOutputType[P]>
            : GetScalarType<T[P], LeadExtractionGroupByOutputType[P]>
        }
      >
    >


  export type LeadExtractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    extractedAt?: boolean
    name?: boolean
    phone?: boolean
    summary?: boolean
    confidence?: boolean
    rawJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadExtraction"]>

  export type LeadExtractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    extractedAt?: boolean
    name?: boolean
    phone?: boolean
    summary?: boolean
    confidence?: boolean
    rawJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadExtraction"]>

  export type LeadExtractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    extractedAt?: boolean
    name?: boolean
    phone?: boolean
    summary?: boolean
    confidence?: boolean
    rawJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadExtraction"]>

  export type LeadExtractionSelectScalar = {
    id?: boolean
    callId?: boolean
    tenantId?: boolean
    extractedAt?: boolean
    name?: boolean
    phone?: boolean
    summary?: boolean
    confidence?: boolean
    rawJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadExtractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callId" | "tenantId" | "extractedAt" | "name" | "phone" | "summary" | "confidence" | "rawJson" | "createdAt" | "updatedAt", ExtArgs["result"]["leadExtraction"]>
  export type LeadExtractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type LeadExtractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type LeadExtractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callSession?: boolean | CallSessionDefaultArgs<ExtArgs>
  }

  export type $LeadExtractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadExtraction"
    objects: {
      callSession: Prisma.$CallSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      callId: string
      tenantId: string
      extractedAt: Date
      name: string | null
      phone: string | null
      summary: string
      confidence: number | null
      rawJson: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leadExtraction"]>
    composites: {}
  }

  type LeadExtractionGetPayload<S extends boolean | null | undefined | LeadExtractionDefaultArgs> = $Result.GetResult<Prisma.$LeadExtractionPayload, S>

  type LeadExtractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadExtractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadExtractionCountAggregateInputType | true
    }

  export interface LeadExtractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadExtraction'], meta: { name: 'LeadExtraction' } }
    /**
     * Find zero or one LeadExtraction that matches the filter.
     * @param {LeadExtractionFindUniqueArgs} args - Arguments to find a LeadExtraction
     * @example
     * // Get one LeadExtraction
     * const leadExtraction = await prisma.leadExtraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadExtractionFindUniqueArgs>(args: SelectSubset<T, LeadExtractionFindUniqueArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadExtraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadExtractionFindUniqueOrThrowArgs} args - Arguments to find a LeadExtraction
     * @example
     * // Get one LeadExtraction
     * const leadExtraction = await prisma.leadExtraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadExtractionFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadExtractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadExtraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionFindFirstArgs} args - Arguments to find a LeadExtraction
     * @example
     * // Get one LeadExtraction
     * const leadExtraction = await prisma.leadExtraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadExtractionFindFirstArgs>(args?: SelectSubset<T, LeadExtractionFindFirstArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadExtraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionFindFirstOrThrowArgs} args - Arguments to find a LeadExtraction
     * @example
     * // Get one LeadExtraction
     * const leadExtraction = await prisma.leadExtraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadExtractionFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadExtractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadExtractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadExtractions
     * const leadExtractions = await prisma.leadExtraction.findMany()
     * 
     * // Get first 10 LeadExtractions
     * const leadExtractions = await prisma.leadExtraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadExtractionWithIdOnly = await prisma.leadExtraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadExtractionFindManyArgs>(args?: SelectSubset<T, LeadExtractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadExtraction.
     * @param {LeadExtractionCreateArgs} args - Arguments to create a LeadExtraction.
     * @example
     * // Create one LeadExtraction
     * const LeadExtraction = await prisma.leadExtraction.create({
     *   data: {
     *     // ... data to create a LeadExtraction
     *   }
     * })
     * 
     */
    create<T extends LeadExtractionCreateArgs>(args: SelectSubset<T, LeadExtractionCreateArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadExtractions.
     * @param {LeadExtractionCreateManyArgs} args - Arguments to create many LeadExtractions.
     * @example
     * // Create many LeadExtractions
     * const leadExtraction = await prisma.leadExtraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadExtractionCreateManyArgs>(args?: SelectSubset<T, LeadExtractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadExtractions and returns the data saved in the database.
     * @param {LeadExtractionCreateManyAndReturnArgs} args - Arguments to create many LeadExtractions.
     * @example
     * // Create many LeadExtractions
     * const leadExtraction = await prisma.leadExtraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadExtractions and only return the `id`
     * const leadExtractionWithIdOnly = await prisma.leadExtraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadExtractionCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadExtractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadExtraction.
     * @param {LeadExtractionDeleteArgs} args - Arguments to delete one LeadExtraction.
     * @example
     * // Delete one LeadExtraction
     * const LeadExtraction = await prisma.leadExtraction.delete({
     *   where: {
     *     // ... filter to delete one LeadExtraction
     *   }
     * })
     * 
     */
    delete<T extends LeadExtractionDeleteArgs>(args: SelectSubset<T, LeadExtractionDeleteArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadExtraction.
     * @param {LeadExtractionUpdateArgs} args - Arguments to update one LeadExtraction.
     * @example
     * // Update one LeadExtraction
     * const leadExtraction = await prisma.leadExtraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadExtractionUpdateArgs>(args: SelectSubset<T, LeadExtractionUpdateArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadExtractions.
     * @param {LeadExtractionDeleteManyArgs} args - Arguments to filter LeadExtractions to delete.
     * @example
     * // Delete a few LeadExtractions
     * const { count } = await prisma.leadExtraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadExtractionDeleteManyArgs>(args?: SelectSubset<T, LeadExtractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadExtractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadExtractions
     * const leadExtraction = await prisma.leadExtraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadExtractionUpdateManyArgs>(args: SelectSubset<T, LeadExtractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadExtractions and returns the data updated in the database.
     * @param {LeadExtractionUpdateManyAndReturnArgs} args - Arguments to update many LeadExtractions.
     * @example
     * // Update many LeadExtractions
     * const leadExtraction = await prisma.leadExtraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadExtractions and only return the `id`
     * const leadExtractionWithIdOnly = await prisma.leadExtraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadExtractionUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadExtractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadExtraction.
     * @param {LeadExtractionUpsertArgs} args - Arguments to update or create a LeadExtraction.
     * @example
     * // Update or create a LeadExtraction
     * const leadExtraction = await prisma.leadExtraction.upsert({
     *   create: {
     *     // ... data to create a LeadExtraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadExtraction we want to update
     *   }
     * })
     */
    upsert<T extends LeadExtractionUpsertArgs>(args: SelectSubset<T, LeadExtractionUpsertArgs<ExtArgs>>): Prisma__LeadExtractionClient<$Result.GetResult<Prisma.$LeadExtractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadExtractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionCountArgs} args - Arguments to filter LeadExtractions to count.
     * @example
     * // Count the number of LeadExtractions
     * const count = await prisma.leadExtraction.count({
     *   where: {
     *     // ... the filter for the LeadExtractions we want to count
     *   }
     * })
    **/
    count<T extends LeadExtractionCountArgs>(
      args?: Subset<T, LeadExtractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadExtractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadExtraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadExtractionAggregateArgs>(args: Subset<T, LeadExtractionAggregateArgs>): Prisma.PrismaPromise<GetLeadExtractionAggregateType<T>>

    /**
     * Group by LeadExtraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadExtractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadExtractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadExtractionGroupByArgs['orderBy'] }
        : { orderBy?: LeadExtractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadExtractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadExtractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadExtraction model
   */
  readonly fields: LeadExtractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadExtraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadExtractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    callSession<T extends CallSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CallSessionDefaultArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadExtraction model
   */
  interface LeadExtractionFieldRefs {
    readonly id: FieldRef<"LeadExtraction", 'String'>
    readonly callId: FieldRef<"LeadExtraction", 'String'>
    readonly tenantId: FieldRef<"LeadExtraction", 'String'>
    readonly extractedAt: FieldRef<"LeadExtraction", 'DateTime'>
    readonly name: FieldRef<"LeadExtraction", 'String'>
    readonly phone: FieldRef<"LeadExtraction", 'String'>
    readonly summary: FieldRef<"LeadExtraction", 'String'>
    readonly confidence: FieldRef<"LeadExtraction", 'Float'>
    readonly rawJson: FieldRef<"LeadExtraction", 'String'>
    readonly createdAt: FieldRef<"LeadExtraction", 'DateTime'>
    readonly updatedAt: FieldRef<"LeadExtraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeadExtraction findUnique
   */
  export type LeadExtractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * Filter, which LeadExtraction to fetch.
     */
    where: LeadExtractionWhereUniqueInput
  }

  /**
   * LeadExtraction findUniqueOrThrow
   */
  export type LeadExtractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * Filter, which LeadExtraction to fetch.
     */
    where: LeadExtractionWhereUniqueInput
  }

  /**
   * LeadExtraction findFirst
   */
  export type LeadExtractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * Filter, which LeadExtraction to fetch.
     */
    where?: LeadExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadExtractions to fetch.
     */
    orderBy?: LeadExtractionOrderByWithRelationInput | LeadExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadExtractions.
     */
    cursor?: LeadExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadExtractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadExtractions.
     */
    distinct?: LeadExtractionScalarFieldEnum | LeadExtractionScalarFieldEnum[]
  }

  /**
   * LeadExtraction findFirstOrThrow
   */
  export type LeadExtractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * Filter, which LeadExtraction to fetch.
     */
    where?: LeadExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadExtractions to fetch.
     */
    orderBy?: LeadExtractionOrderByWithRelationInput | LeadExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadExtractions.
     */
    cursor?: LeadExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadExtractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadExtractions.
     */
    distinct?: LeadExtractionScalarFieldEnum | LeadExtractionScalarFieldEnum[]
  }

  /**
   * LeadExtraction findMany
   */
  export type LeadExtractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * Filter, which LeadExtractions to fetch.
     */
    where?: LeadExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadExtractions to fetch.
     */
    orderBy?: LeadExtractionOrderByWithRelationInput | LeadExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadExtractions.
     */
    cursor?: LeadExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadExtractions.
     */
    skip?: number
    distinct?: LeadExtractionScalarFieldEnum | LeadExtractionScalarFieldEnum[]
  }

  /**
   * LeadExtraction create
   */
  export type LeadExtractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadExtraction.
     */
    data: XOR<LeadExtractionCreateInput, LeadExtractionUncheckedCreateInput>
  }

  /**
   * LeadExtraction createMany
   */
  export type LeadExtractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadExtractions.
     */
    data: LeadExtractionCreateManyInput | LeadExtractionCreateManyInput[]
  }

  /**
   * LeadExtraction createManyAndReturn
   */
  export type LeadExtractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * The data used to create many LeadExtractions.
     */
    data: LeadExtractionCreateManyInput | LeadExtractionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadExtraction update
   */
  export type LeadExtractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadExtraction.
     */
    data: XOR<LeadExtractionUpdateInput, LeadExtractionUncheckedUpdateInput>
    /**
     * Choose, which LeadExtraction to update.
     */
    where: LeadExtractionWhereUniqueInput
  }

  /**
   * LeadExtraction updateMany
   */
  export type LeadExtractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadExtractions.
     */
    data: XOR<LeadExtractionUpdateManyMutationInput, LeadExtractionUncheckedUpdateManyInput>
    /**
     * Filter which LeadExtractions to update
     */
    where?: LeadExtractionWhereInput
    /**
     * Limit how many LeadExtractions to update.
     */
    limit?: number
  }

  /**
   * LeadExtraction updateManyAndReturn
   */
  export type LeadExtractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * The data used to update LeadExtractions.
     */
    data: XOR<LeadExtractionUpdateManyMutationInput, LeadExtractionUncheckedUpdateManyInput>
    /**
     * Filter which LeadExtractions to update
     */
    where?: LeadExtractionWhereInput
    /**
     * Limit how many LeadExtractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadExtraction upsert
   */
  export type LeadExtractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadExtraction to update in case it exists.
     */
    where: LeadExtractionWhereUniqueInput
    /**
     * In case the LeadExtraction found by the `where` argument doesn't exist, create a new LeadExtraction with this data.
     */
    create: XOR<LeadExtractionCreateInput, LeadExtractionUncheckedCreateInput>
    /**
     * In case the LeadExtraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadExtractionUpdateInput, LeadExtractionUncheckedUpdateInput>
  }

  /**
   * LeadExtraction delete
   */
  export type LeadExtractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
    /**
     * Filter which LeadExtraction to delete.
     */
    where: LeadExtractionWhereUniqueInput
  }

  /**
   * LeadExtraction deleteMany
   */
  export type LeadExtractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadExtractions to delete
     */
    where?: LeadExtractionWhereInput
    /**
     * Limit how many LeadExtractions to delete.
     */
    limit?: number
  }

  /**
   * LeadExtraction without action
   */
  export type LeadExtractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadExtraction
     */
    select?: LeadExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadExtraction
     */
    omit?: LeadExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadExtractionInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    status: $Enums.CampaignStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    status: $Enums.CampaignStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    status: $Enums.CampaignStatus
    createdAt: Date
    updatedAt: Date
    _count: CampaignCountAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    calls?: boolean | Campaign$callsArgs<ExtArgs>
    contacts?: boolean | Campaign$contactsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    calls?: boolean | Campaign$callsArgs<ExtArgs>
    contacts?: boolean | Campaign$contactsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      calls: Prisma.$CampaignCallPayload<ExtArgs>[]
      contacts: Prisma.$CampaignContactPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      status: $Enums.CampaignStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    calls<T extends Campaign$callsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$callsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contacts<T extends Campaign$contactsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly tenantId: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly description: FieldRef<"Campaign", 'String'>
    readonly status: FieldRef<"Campaign", 'CampaignStatus'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign.calls
   */
  export type Campaign$callsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    where?: CampaignCallWhereInput
    orderBy?: CampaignCallOrderByWithRelationInput | CampaignCallOrderByWithRelationInput[]
    cursor?: CampaignCallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignCallScalarFieldEnum | CampaignCallScalarFieldEnum[]
  }

  /**
   * Campaign.contacts
   */
  export type Campaign$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    where?: CampaignContactWhereInput
    orderBy?: CampaignContactOrderByWithRelationInput | CampaignContactOrderByWithRelationInput[]
    cursor?: CampaignContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignContactScalarFieldEnum | CampaignContactScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model CampaignCall
   */

  export type AggregateCampaignCall = {
    _count: CampaignCallCountAggregateOutputType | null
    _min: CampaignCallMinAggregateOutputType | null
    _max: CampaignCallMaxAggregateOutputType | null
  }

  export type CampaignCallMinAggregateOutputType = {
    campaignId: string | null
    callId: string | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type CampaignCallMaxAggregateOutputType = {
    campaignId: string | null
    callId: string | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type CampaignCallCountAggregateOutputType = {
    campaignId: number
    callId: number
    tenantId: number
    createdAt: number
    _all: number
  }


  export type CampaignCallMinAggregateInputType = {
    campaignId?: true
    callId?: true
    tenantId?: true
    createdAt?: true
  }

  export type CampaignCallMaxAggregateInputType = {
    campaignId?: true
    callId?: true
    tenantId?: true
    createdAt?: true
  }

  export type CampaignCallCountAggregateInputType = {
    campaignId?: true
    callId?: true
    tenantId?: true
    createdAt?: true
    _all?: true
  }

  export type CampaignCallAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignCall to aggregate.
     */
    where?: CampaignCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignCalls to fetch.
     */
    orderBy?: CampaignCallOrderByWithRelationInput | CampaignCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignCalls
    **/
    _count?: true | CampaignCallCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignCallMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignCallMaxAggregateInputType
  }

  export type GetCampaignCallAggregateType<T extends CampaignCallAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignCall]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignCall[P]>
      : GetScalarType<T[P], AggregateCampaignCall[P]>
  }




  export type CampaignCallGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignCallWhereInput
    orderBy?: CampaignCallOrderByWithAggregationInput | CampaignCallOrderByWithAggregationInput[]
    by: CampaignCallScalarFieldEnum[] | CampaignCallScalarFieldEnum
    having?: CampaignCallScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCallCountAggregateInputType | true
    _min?: CampaignCallMinAggregateInputType
    _max?: CampaignCallMaxAggregateInputType
  }

  export type CampaignCallGroupByOutputType = {
    campaignId: string
    callId: string
    tenantId: string
    createdAt: Date
    _count: CampaignCallCountAggregateOutputType | null
    _min: CampaignCallMinAggregateOutputType | null
    _max: CampaignCallMaxAggregateOutputType | null
  }

  type GetCampaignCallGroupByPayload<T extends CampaignCallGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignCallGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignCallGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignCallGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignCallGroupByOutputType[P]>
        }
      >
    >


  export type CampaignCallSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    campaignId?: boolean
    callId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignCall"]>

  export type CampaignCallSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    campaignId?: boolean
    callId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignCall"]>

  export type CampaignCallSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    campaignId?: boolean
    callId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignCall"]>

  export type CampaignCallSelectScalar = {
    campaignId?: boolean
    callId?: boolean
    tenantId?: boolean
    createdAt?: boolean
  }

  export type CampaignCallOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"campaignId" | "callId" | "tenantId" | "createdAt", ExtArgs["result"]["campaignCall"]>
  export type CampaignCallInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type CampaignCallIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type CampaignCallIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }

  export type $CampaignCallPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignCall"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      call: Prisma.$CallSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      campaignId: string
      callId: string
      tenantId: string
      createdAt: Date
    }, ExtArgs["result"]["campaignCall"]>
    composites: {}
  }

  type CampaignCallGetPayload<S extends boolean | null | undefined | CampaignCallDefaultArgs> = $Result.GetResult<Prisma.$CampaignCallPayload, S>

  type CampaignCallCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignCallFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCallCountAggregateInputType | true
    }

  export interface CampaignCallDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignCall'], meta: { name: 'CampaignCall' } }
    /**
     * Find zero or one CampaignCall that matches the filter.
     * @param {CampaignCallFindUniqueArgs} args - Arguments to find a CampaignCall
     * @example
     * // Get one CampaignCall
     * const campaignCall = await prisma.campaignCall.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignCallFindUniqueArgs>(args: SelectSubset<T, CampaignCallFindUniqueArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignCall that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignCallFindUniqueOrThrowArgs} args - Arguments to find a CampaignCall
     * @example
     * // Get one CampaignCall
     * const campaignCall = await prisma.campaignCall.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignCallFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignCallFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignCall that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallFindFirstArgs} args - Arguments to find a CampaignCall
     * @example
     * // Get one CampaignCall
     * const campaignCall = await prisma.campaignCall.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignCallFindFirstArgs>(args?: SelectSubset<T, CampaignCallFindFirstArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignCall that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallFindFirstOrThrowArgs} args - Arguments to find a CampaignCall
     * @example
     * // Get one CampaignCall
     * const campaignCall = await prisma.campaignCall.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignCallFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignCallFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignCalls
     * const campaignCalls = await prisma.campaignCall.findMany()
     * 
     * // Get first 10 CampaignCalls
     * const campaignCalls = await prisma.campaignCall.findMany({ take: 10 })
     * 
     * // Only select the `campaignId`
     * const campaignCallWithCampaignIdOnly = await prisma.campaignCall.findMany({ select: { campaignId: true } })
     * 
     */
    findMany<T extends CampaignCallFindManyArgs>(args?: SelectSubset<T, CampaignCallFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignCall.
     * @param {CampaignCallCreateArgs} args - Arguments to create a CampaignCall.
     * @example
     * // Create one CampaignCall
     * const CampaignCall = await prisma.campaignCall.create({
     *   data: {
     *     // ... data to create a CampaignCall
     *   }
     * })
     * 
     */
    create<T extends CampaignCallCreateArgs>(args: SelectSubset<T, CampaignCallCreateArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignCalls.
     * @param {CampaignCallCreateManyArgs} args - Arguments to create many CampaignCalls.
     * @example
     * // Create many CampaignCalls
     * const campaignCall = await prisma.campaignCall.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCallCreateManyArgs>(args?: SelectSubset<T, CampaignCallCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignCalls and returns the data saved in the database.
     * @param {CampaignCallCreateManyAndReturnArgs} args - Arguments to create many CampaignCalls.
     * @example
     * // Create many CampaignCalls
     * const campaignCall = await prisma.campaignCall.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignCalls and only return the `campaignId`
     * const campaignCallWithCampaignIdOnly = await prisma.campaignCall.createManyAndReturn({
     *   select: { campaignId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCallCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCallCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignCall.
     * @param {CampaignCallDeleteArgs} args - Arguments to delete one CampaignCall.
     * @example
     * // Delete one CampaignCall
     * const CampaignCall = await prisma.campaignCall.delete({
     *   where: {
     *     // ... filter to delete one CampaignCall
     *   }
     * })
     * 
     */
    delete<T extends CampaignCallDeleteArgs>(args: SelectSubset<T, CampaignCallDeleteArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignCall.
     * @param {CampaignCallUpdateArgs} args - Arguments to update one CampaignCall.
     * @example
     * // Update one CampaignCall
     * const campaignCall = await prisma.campaignCall.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignCallUpdateArgs>(args: SelectSubset<T, CampaignCallUpdateArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignCalls.
     * @param {CampaignCallDeleteManyArgs} args - Arguments to filter CampaignCalls to delete.
     * @example
     * // Delete a few CampaignCalls
     * const { count } = await prisma.campaignCall.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignCallDeleteManyArgs>(args?: SelectSubset<T, CampaignCallDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignCalls
     * const campaignCall = await prisma.campaignCall.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignCallUpdateManyArgs>(args: SelectSubset<T, CampaignCallUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignCalls and returns the data updated in the database.
     * @param {CampaignCallUpdateManyAndReturnArgs} args - Arguments to update many CampaignCalls.
     * @example
     * // Update many CampaignCalls
     * const campaignCall = await prisma.campaignCall.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignCalls and only return the `campaignId`
     * const campaignCallWithCampaignIdOnly = await prisma.campaignCall.updateManyAndReturn({
     *   select: { campaignId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignCallUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignCallUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignCall.
     * @param {CampaignCallUpsertArgs} args - Arguments to update or create a CampaignCall.
     * @example
     * // Update or create a CampaignCall
     * const campaignCall = await prisma.campaignCall.upsert({
     *   create: {
     *     // ... data to create a CampaignCall
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignCall we want to update
     *   }
     * })
     */
    upsert<T extends CampaignCallUpsertArgs>(args: SelectSubset<T, CampaignCallUpsertArgs<ExtArgs>>): Prisma__CampaignCallClient<$Result.GetResult<Prisma.$CampaignCallPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallCountArgs} args - Arguments to filter CampaignCalls to count.
     * @example
     * // Count the number of CampaignCalls
     * const count = await prisma.campaignCall.count({
     *   where: {
     *     // ... the filter for the CampaignCalls we want to count
     *   }
     * })
    **/
    count<T extends CampaignCallCountArgs>(
      args?: Subset<T, CampaignCallCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCallCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignCall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignCallAggregateArgs>(args: Subset<T, CampaignCallAggregateArgs>): Prisma.PrismaPromise<GetCampaignCallAggregateType<T>>

    /**
     * Group by CampaignCall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCallGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignCallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignCallGroupByArgs['orderBy'] }
        : { orderBy?: CampaignCallGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignCallGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignCallGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignCall model
   */
  readonly fields: CampaignCallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignCall.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignCallClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    call<T extends CallSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CallSessionDefaultArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CampaignCall model
   */
  interface CampaignCallFieldRefs {
    readonly campaignId: FieldRef<"CampaignCall", 'String'>
    readonly callId: FieldRef<"CampaignCall", 'String'>
    readonly tenantId: FieldRef<"CampaignCall", 'String'>
    readonly createdAt: FieldRef<"CampaignCall", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignCall findUnique
   */
  export type CampaignCallFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * Filter, which CampaignCall to fetch.
     */
    where: CampaignCallWhereUniqueInput
  }

  /**
   * CampaignCall findUniqueOrThrow
   */
  export type CampaignCallFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * Filter, which CampaignCall to fetch.
     */
    where: CampaignCallWhereUniqueInput
  }

  /**
   * CampaignCall findFirst
   */
  export type CampaignCallFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * Filter, which CampaignCall to fetch.
     */
    where?: CampaignCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignCalls to fetch.
     */
    orderBy?: CampaignCallOrderByWithRelationInput | CampaignCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignCalls.
     */
    cursor?: CampaignCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignCalls.
     */
    distinct?: CampaignCallScalarFieldEnum | CampaignCallScalarFieldEnum[]
  }

  /**
   * CampaignCall findFirstOrThrow
   */
  export type CampaignCallFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * Filter, which CampaignCall to fetch.
     */
    where?: CampaignCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignCalls to fetch.
     */
    orderBy?: CampaignCallOrderByWithRelationInput | CampaignCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignCalls.
     */
    cursor?: CampaignCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignCalls.
     */
    distinct?: CampaignCallScalarFieldEnum | CampaignCallScalarFieldEnum[]
  }

  /**
   * CampaignCall findMany
   */
  export type CampaignCallFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * Filter, which CampaignCalls to fetch.
     */
    where?: CampaignCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignCalls to fetch.
     */
    orderBy?: CampaignCallOrderByWithRelationInput | CampaignCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignCalls.
     */
    cursor?: CampaignCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignCalls.
     */
    skip?: number
    distinct?: CampaignCallScalarFieldEnum | CampaignCallScalarFieldEnum[]
  }

  /**
   * CampaignCall create
   */
  export type CampaignCallCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignCall.
     */
    data: XOR<CampaignCallCreateInput, CampaignCallUncheckedCreateInput>
  }

  /**
   * CampaignCall createMany
   */
  export type CampaignCallCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignCalls.
     */
    data: CampaignCallCreateManyInput | CampaignCallCreateManyInput[]
  }

  /**
   * CampaignCall createManyAndReturn
   */
  export type CampaignCallCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignCalls.
     */
    data: CampaignCallCreateManyInput | CampaignCallCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignCall update
   */
  export type CampaignCallUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignCall.
     */
    data: XOR<CampaignCallUpdateInput, CampaignCallUncheckedUpdateInput>
    /**
     * Choose, which CampaignCall to update.
     */
    where: CampaignCallWhereUniqueInput
  }

  /**
   * CampaignCall updateMany
   */
  export type CampaignCallUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignCalls.
     */
    data: XOR<CampaignCallUpdateManyMutationInput, CampaignCallUncheckedUpdateManyInput>
    /**
     * Filter which CampaignCalls to update
     */
    where?: CampaignCallWhereInput
    /**
     * Limit how many CampaignCalls to update.
     */
    limit?: number
  }

  /**
   * CampaignCall updateManyAndReturn
   */
  export type CampaignCallUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * The data used to update CampaignCalls.
     */
    data: XOR<CampaignCallUpdateManyMutationInput, CampaignCallUncheckedUpdateManyInput>
    /**
     * Filter which CampaignCalls to update
     */
    where?: CampaignCallWhereInput
    /**
     * Limit how many CampaignCalls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignCall upsert
   */
  export type CampaignCallUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignCall to update in case it exists.
     */
    where: CampaignCallWhereUniqueInput
    /**
     * In case the CampaignCall found by the `where` argument doesn't exist, create a new CampaignCall with this data.
     */
    create: XOR<CampaignCallCreateInput, CampaignCallUncheckedCreateInput>
    /**
     * In case the CampaignCall was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignCallUpdateInput, CampaignCallUncheckedUpdateInput>
  }

  /**
   * CampaignCall delete
   */
  export type CampaignCallDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
    /**
     * Filter which CampaignCall to delete.
     */
    where: CampaignCallWhereUniqueInput
  }

  /**
   * CampaignCall deleteMany
   */
  export type CampaignCallDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignCalls to delete
     */
    where?: CampaignCallWhereInput
    /**
     * Limit how many CampaignCalls to delete.
     */
    limit?: number
  }

  /**
   * CampaignCall without action
   */
  export type CampaignCallDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCall
     */
    select?: CampaignCallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignCall
     */
    omit?: CampaignCallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignCallInclude<ExtArgs> | null
  }


  /**
   * Model CampaignContact
   */

  export type AggregateCampaignContact = {
    _count: CampaignContactCountAggregateOutputType | null
    _min: CampaignContactMinAggregateOutputType | null
    _max: CampaignContactMaxAggregateOutputType | null
  }

  export type CampaignContactMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    tenantId: string | null
    sourceCallId: string | null
    name: string | null
    phone: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignContactMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    tenantId: string | null
    sourceCallId: string | null
    name: string | null
    phone: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignContactCountAggregateOutputType = {
    id: number
    campaignId: number
    tenantId: number
    sourceCallId: number
    name: number
    phone: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignContactMinAggregateInputType = {
    id?: true
    campaignId?: true
    tenantId?: true
    sourceCallId?: true
    name?: true
    phone?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignContactMaxAggregateInputType = {
    id?: true
    campaignId?: true
    tenantId?: true
    sourceCallId?: true
    name?: true
    phone?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignContactCountAggregateInputType = {
    id?: true
    campaignId?: true
    tenantId?: true
    sourceCallId?: true
    name?: true
    phone?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignContact to aggregate.
     */
    where?: CampaignContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignContacts to fetch.
     */
    orderBy?: CampaignContactOrderByWithRelationInput | CampaignContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignContacts
    **/
    _count?: true | CampaignContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignContactMaxAggregateInputType
  }

  export type GetCampaignContactAggregateType<T extends CampaignContactAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignContact[P]>
      : GetScalarType<T[P], AggregateCampaignContact[P]>
  }




  export type CampaignContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignContactWhereInput
    orderBy?: CampaignContactOrderByWithAggregationInput | CampaignContactOrderByWithAggregationInput[]
    by: CampaignContactScalarFieldEnum[] | CampaignContactScalarFieldEnum
    having?: CampaignContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignContactCountAggregateInputType | true
    _min?: CampaignContactMinAggregateInputType
    _max?: CampaignContactMaxAggregateInputType
  }

  export type CampaignContactGroupByOutputType = {
    id: string
    campaignId: string
    tenantId: string
    sourceCallId: string | null
    name: string | null
    phone: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: CampaignContactCountAggregateOutputType | null
    _min: CampaignContactMinAggregateOutputType | null
    _max: CampaignContactMaxAggregateOutputType | null
  }

  type GetCampaignContactGroupByPayload<T extends CampaignContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignContactGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignContactGroupByOutputType[P]>
        }
      >
    >


  export type CampaignContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    tenantId?: boolean
    sourceCallId?: boolean
    name?: boolean
    phone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sourceCall?: boolean | CampaignContact$sourceCallArgs<ExtArgs>
  }, ExtArgs["result"]["campaignContact"]>

  export type CampaignContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    tenantId?: boolean
    sourceCallId?: boolean
    name?: boolean
    phone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sourceCall?: boolean | CampaignContact$sourceCallArgs<ExtArgs>
  }, ExtArgs["result"]["campaignContact"]>

  export type CampaignContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    tenantId?: boolean
    sourceCallId?: boolean
    name?: boolean
    phone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sourceCall?: boolean | CampaignContact$sourceCallArgs<ExtArgs>
  }, ExtArgs["result"]["campaignContact"]>

  export type CampaignContactSelectScalar = {
    id?: boolean
    campaignId?: boolean
    tenantId?: boolean
    sourceCallId?: boolean
    name?: boolean
    phone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "tenantId" | "sourceCallId" | "name" | "phone" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["campaignContact"]>
  export type CampaignContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sourceCall?: boolean | CampaignContact$sourceCallArgs<ExtArgs>
  }
  export type CampaignContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sourceCall?: boolean | CampaignContact$sourceCallArgs<ExtArgs>
  }
  export type CampaignContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    sourceCall?: boolean | CampaignContact$sourceCallArgs<ExtArgs>
  }

  export type $CampaignContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignContact"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      sourceCall: Prisma.$CallSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      tenantId: string
      sourceCallId: string | null
      name: string | null
      phone: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaignContact"]>
    composites: {}
  }

  type CampaignContactGetPayload<S extends boolean | null | undefined | CampaignContactDefaultArgs> = $Result.GetResult<Prisma.$CampaignContactPayload, S>

  type CampaignContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignContactCountAggregateInputType | true
    }

  export interface CampaignContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignContact'], meta: { name: 'CampaignContact' } }
    /**
     * Find zero or one CampaignContact that matches the filter.
     * @param {CampaignContactFindUniqueArgs} args - Arguments to find a CampaignContact
     * @example
     * // Get one CampaignContact
     * const campaignContact = await prisma.campaignContact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignContactFindUniqueArgs>(args: SelectSubset<T, CampaignContactFindUniqueArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignContact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignContactFindUniqueOrThrowArgs} args - Arguments to find a CampaignContact
     * @example
     * // Get one CampaignContact
     * const campaignContact = await prisma.campaignContact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignContactFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignContact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactFindFirstArgs} args - Arguments to find a CampaignContact
     * @example
     * // Get one CampaignContact
     * const campaignContact = await prisma.campaignContact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignContactFindFirstArgs>(args?: SelectSubset<T, CampaignContactFindFirstArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignContact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactFindFirstOrThrowArgs} args - Arguments to find a CampaignContact
     * @example
     * // Get one CampaignContact
     * const campaignContact = await prisma.campaignContact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignContactFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignContacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignContacts
     * const campaignContacts = await prisma.campaignContact.findMany()
     * 
     * // Get first 10 CampaignContacts
     * const campaignContacts = await prisma.campaignContact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignContactWithIdOnly = await prisma.campaignContact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignContactFindManyArgs>(args?: SelectSubset<T, CampaignContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignContact.
     * @param {CampaignContactCreateArgs} args - Arguments to create a CampaignContact.
     * @example
     * // Create one CampaignContact
     * const CampaignContact = await prisma.campaignContact.create({
     *   data: {
     *     // ... data to create a CampaignContact
     *   }
     * })
     * 
     */
    create<T extends CampaignContactCreateArgs>(args: SelectSubset<T, CampaignContactCreateArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignContacts.
     * @param {CampaignContactCreateManyArgs} args - Arguments to create many CampaignContacts.
     * @example
     * // Create many CampaignContacts
     * const campaignContact = await prisma.campaignContact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignContactCreateManyArgs>(args?: SelectSubset<T, CampaignContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignContacts and returns the data saved in the database.
     * @param {CampaignContactCreateManyAndReturnArgs} args - Arguments to create many CampaignContacts.
     * @example
     * // Create many CampaignContacts
     * const campaignContact = await prisma.campaignContact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignContacts and only return the `id`
     * const campaignContactWithIdOnly = await prisma.campaignContact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignContactCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignContact.
     * @param {CampaignContactDeleteArgs} args - Arguments to delete one CampaignContact.
     * @example
     * // Delete one CampaignContact
     * const CampaignContact = await prisma.campaignContact.delete({
     *   where: {
     *     // ... filter to delete one CampaignContact
     *   }
     * })
     * 
     */
    delete<T extends CampaignContactDeleteArgs>(args: SelectSubset<T, CampaignContactDeleteArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignContact.
     * @param {CampaignContactUpdateArgs} args - Arguments to update one CampaignContact.
     * @example
     * // Update one CampaignContact
     * const campaignContact = await prisma.campaignContact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignContactUpdateArgs>(args: SelectSubset<T, CampaignContactUpdateArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignContacts.
     * @param {CampaignContactDeleteManyArgs} args - Arguments to filter CampaignContacts to delete.
     * @example
     * // Delete a few CampaignContacts
     * const { count } = await prisma.campaignContact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignContactDeleteManyArgs>(args?: SelectSubset<T, CampaignContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignContacts
     * const campaignContact = await prisma.campaignContact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignContactUpdateManyArgs>(args: SelectSubset<T, CampaignContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignContacts and returns the data updated in the database.
     * @param {CampaignContactUpdateManyAndReturnArgs} args - Arguments to update many CampaignContacts.
     * @example
     * // Update many CampaignContacts
     * const campaignContact = await prisma.campaignContact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignContacts and only return the `id`
     * const campaignContactWithIdOnly = await prisma.campaignContact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignContactUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignContact.
     * @param {CampaignContactUpsertArgs} args - Arguments to update or create a CampaignContact.
     * @example
     * // Update or create a CampaignContact
     * const campaignContact = await prisma.campaignContact.upsert({
     *   create: {
     *     // ... data to create a CampaignContact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignContact we want to update
     *   }
     * })
     */
    upsert<T extends CampaignContactUpsertArgs>(args: SelectSubset<T, CampaignContactUpsertArgs<ExtArgs>>): Prisma__CampaignContactClient<$Result.GetResult<Prisma.$CampaignContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactCountArgs} args - Arguments to filter CampaignContacts to count.
     * @example
     * // Count the number of CampaignContacts
     * const count = await prisma.campaignContact.count({
     *   where: {
     *     // ... the filter for the CampaignContacts we want to count
     *   }
     * })
    **/
    count<T extends CampaignContactCountArgs>(
      args?: Subset<T, CampaignContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignContactAggregateArgs>(args: Subset<T, CampaignContactAggregateArgs>): Prisma.PrismaPromise<GetCampaignContactAggregateType<T>>

    /**
     * Group by CampaignContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignContactGroupByArgs['orderBy'] }
        : { orderBy?: CampaignContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignContact model
   */
  readonly fields: CampaignContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignContact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sourceCall<T extends CampaignContact$sourceCallArgs<ExtArgs> = {}>(args?: Subset<T, CampaignContact$sourceCallArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CampaignContact model
   */
  interface CampaignContactFieldRefs {
    readonly id: FieldRef<"CampaignContact", 'String'>
    readonly campaignId: FieldRef<"CampaignContact", 'String'>
    readonly tenantId: FieldRef<"CampaignContact", 'String'>
    readonly sourceCallId: FieldRef<"CampaignContact", 'String'>
    readonly name: FieldRef<"CampaignContact", 'String'>
    readonly phone: FieldRef<"CampaignContact", 'String'>
    readonly notes: FieldRef<"CampaignContact", 'String'>
    readonly createdAt: FieldRef<"CampaignContact", 'DateTime'>
    readonly updatedAt: FieldRef<"CampaignContact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignContact findUnique
   */
  export type CampaignContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * Filter, which CampaignContact to fetch.
     */
    where: CampaignContactWhereUniqueInput
  }

  /**
   * CampaignContact findUniqueOrThrow
   */
  export type CampaignContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * Filter, which CampaignContact to fetch.
     */
    where: CampaignContactWhereUniqueInput
  }

  /**
   * CampaignContact findFirst
   */
  export type CampaignContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * Filter, which CampaignContact to fetch.
     */
    where?: CampaignContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignContacts to fetch.
     */
    orderBy?: CampaignContactOrderByWithRelationInput | CampaignContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignContacts.
     */
    cursor?: CampaignContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignContacts.
     */
    distinct?: CampaignContactScalarFieldEnum | CampaignContactScalarFieldEnum[]
  }

  /**
   * CampaignContact findFirstOrThrow
   */
  export type CampaignContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * Filter, which CampaignContact to fetch.
     */
    where?: CampaignContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignContacts to fetch.
     */
    orderBy?: CampaignContactOrderByWithRelationInput | CampaignContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignContacts.
     */
    cursor?: CampaignContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignContacts.
     */
    distinct?: CampaignContactScalarFieldEnum | CampaignContactScalarFieldEnum[]
  }

  /**
   * CampaignContact findMany
   */
  export type CampaignContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * Filter, which CampaignContacts to fetch.
     */
    where?: CampaignContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignContacts to fetch.
     */
    orderBy?: CampaignContactOrderByWithRelationInput | CampaignContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignContacts.
     */
    cursor?: CampaignContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignContacts.
     */
    skip?: number
    distinct?: CampaignContactScalarFieldEnum | CampaignContactScalarFieldEnum[]
  }

  /**
   * CampaignContact create
   */
  export type CampaignContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignContact.
     */
    data: XOR<CampaignContactCreateInput, CampaignContactUncheckedCreateInput>
  }

  /**
   * CampaignContact createMany
   */
  export type CampaignContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignContacts.
     */
    data: CampaignContactCreateManyInput | CampaignContactCreateManyInput[]
  }

  /**
   * CampaignContact createManyAndReturn
   */
  export type CampaignContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignContacts.
     */
    data: CampaignContactCreateManyInput | CampaignContactCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignContact update
   */
  export type CampaignContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignContact.
     */
    data: XOR<CampaignContactUpdateInput, CampaignContactUncheckedUpdateInput>
    /**
     * Choose, which CampaignContact to update.
     */
    where: CampaignContactWhereUniqueInput
  }

  /**
   * CampaignContact updateMany
   */
  export type CampaignContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignContacts.
     */
    data: XOR<CampaignContactUpdateManyMutationInput, CampaignContactUncheckedUpdateManyInput>
    /**
     * Filter which CampaignContacts to update
     */
    where?: CampaignContactWhereInput
    /**
     * Limit how many CampaignContacts to update.
     */
    limit?: number
  }

  /**
   * CampaignContact updateManyAndReturn
   */
  export type CampaignContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * The data used to update CampaignContacts.
     */
    data: XOR<CampaignContactUpdateManyMutationInput, CampaignContactUncheckedUpdateManyInput>
    /**
     * Filter which CampaignContacts to update
     */
    where?: CampaignContactWhereInput
    /**
     * Limit how many CampaignContacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignContact upsert
   */
  export type CampaignContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignContact to update in case it exists.
     */
    where: CampaignContactWhereUniqueInput
    /**
     * In case the CampaignContact found by the `where` argument doesn't exist, create a new CampaignContact with this data.
     */
    create: XOR<CampaignContactCreateInput, CampaignContactUncheckedCreateInput>
    /**
     * In case the CampaignContact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignContactUpdateInput, CampaignContactUncheckedUpdateInput>
  }

  /**
   * CampaignContact delete
   */
  export type CampaignContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
    /**
     * Filter which CampaignContact to delete.
     */
    where: CampaignContactWhereUniqueInput
  }

  /**
   * CampaignContact deleteMany
   */
  export type CampaignContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignContacts to delete
     */
    where?: CampaignContactWhereInput
    /**
     * Limit how many CampaignContacts to delete.
     */
    limit?: number
  }

  /**
   * CampaignContact.sourceCall
   */
  export type CampaignContact$sourceCallArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    where?: CallSessionWhereInput
  }

  /**
   * CampaignContact without action
   */
  export type CampaignContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignContact
     */
    select?: CampaignContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignContact
     */
    omit?: CampaignContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignContactInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    plan: 'plan',
    workspaceConfigJson: 'workspaceConfigJson',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const CallSessionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    roomId: 'roomId',
    phoneNumber: 'phoneNumber',
    agentName: 'agentName',
    direction: 'direction',
    status: 'status',
    initiatedAt: 'initiatedAt',
    connectedAt: 'connectedAt',
    completedAt: 'completedAt',
    failedAt: 'failedAt',
    durationSec: 'durationSec',
    transcriptTurns: 'transcriptTurns',
    recordingUrl: 'recordingUrl',
    lastError: 'lastError',
    estimatedCost: 'estimatedCost',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CallSessionScalarFieldEnum = (typeof CallSessionScalarFieldEnum)[keyof typeof CallSessionScalarFieldEnum]


  export const CallEventScalarFieldEnum: {
    id: 'id',
    callId: 'callId',
    tenantId: 'tenantId',
    eventType: 'eventType',
    occurredAt: 'occurredAt',
    eventId: 'eventId',
    payloadJson: 'payloadJson',
    rawEnvelope: 'rawEnvelope',
    rawHeaders: 'rawHeaders',
    createdAt: 'createdAt'
  };

  export type CallEventScalarFieldEnum = (typeof CallEventScalarFieldEnum)[keyof typeof CallEventScalarFieldEnum]


  export const TranscriptSegmentScalarFieldEnum: {
    id: 'id',
    callId: 'callId',
    tenantId: 'tenantId',
    speaker: 'speaker',
    text: 'text',
    isFinal: 'isFinal',
    sequenceNo: 'sequenceNo',
    providerMessageId: 'providerMessageId',
    rawJson: 'rawJson',
    occurredAt: 'occurredAt',
    createdAt: 'createdAt'
  };

  export type TranscriptSegmentScalarFieldEnum = (typeof TranscriptSegmentScalarFieldEnum)[keyof typeof TranscriptSegmentScalarFieldEnum]


  export const LeadExtractionScalarFieldEnum: {
    id: 'id',
    callId: 'callId',
    tenantId: 'tenantId',
    extractedAt: 'extractedAt',
    name: 'name',
    phone: 'phone',
    summary: 'summary',
    confidence: 'confidence',
    rawJson: 'rawJson',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadExtractionScalarFieldEnum = (typeof LeadExtractionScalarFieldEnum)[keyof typeof LeadExtractionScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const CampaignCallScalarFieldEnum: {
    campaignId: 'campaignId',
    callId: 'callId',
    tenantId: 'tenantId',
    createdAt: 'createdAt'
  };

  export type CampaignCallScalarFieldEnum = (typeof CampaignCallScalarFieldEnum)[keyof typeof CampaignCallScalarFieldEnum]


  export const CampaignContactScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    tenantId: 'tenantId',
    sourceCallId: 'sourceCallId',
    name: 'name',
    phone: 'phone',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignContactScalarFieldEnum = (typeof CampaignContactScalarFieldEnum)[keyof typeof CampaignContactScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'PlanKey'
   */
  export type EnumPlanKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanKey'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'CallLifecycleStatus'
   */
  export type EnumCallLifecycleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallLifecycleStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Speaker'
   */
  export type EnumSpeakerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Speaker'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CampaignStatus'
   */
  export type EnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringNullableFilter<"Tenant"> | string | null
    plan?: EnumPlanKeyFilter<"Tenant"> | $Enums.PlanKey
    workspaceConfigJson?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    callSessions?: CallSessionListRelationFilter
    campaigns?: CampaignListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    plan?: SortOrder
    workspaceConfigJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    callSessions?: CallSessionOrderByRelationAggregateInput
    campaigns?: CampaignOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringNullableFilter<"Tenant"> | string | null
    plan?: EnumPlanKeyFilter<"Tenant"> | $Enums.PlanKey
    workspaceConfigJson?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    callSessions?: CallSessionListRelationFilter
    campaigns?: CampaignListRelationFilter
  }, "id">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    plan?: SortOrder
    workspaceConfigJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    plan?: EnumPlanKeyWithAggregatesFilter<"Tenant"> | $Enums.PlanKey
    workspaceConfigJson?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type CallSessionWhereInput = {
    AND?: CallSessionWhereInput | CallSessionWhereInput[]
    OR?: CallSessionWhereInput[]
    NOT?: CallSessionWhereInput | CallSessionWhereInput[]
    id?: StringFilter<"CallSession"> | string
    tenantId?: StringFilter<"CallSession"> | string
    roomId?: StringFilter<"CallSession"> | string
    phoneNumber?: StringNullableFilter<"CallSession"> | string | null
    agentName?: StringNullableFilter<"CallSession"> | string | null
    direction?: StringNullableFilter<"CallSession"> | string | null
    status?: EnumCallLifecycleStatusFilter<"CallSession"> | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFilter<"CallSession"> | Date | string
    connectedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    durationSec?: FloatNullableFilter<"CallSession"> | number | null
    transcriptTurns?: IntNullableFilter<"CallSession"> | number | null
    recordingUrl?: StringNullableFilter<"CallSession"> | string | null
    lastError?: StringNullableFilter<"CallSession"> | string | null
    estimatedCost?: FloatNullableFilter<"CallSession"> | number | null
    createdAt?: DateTimeFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeFilter<"CallSession"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    events?: CallEventListRelationFilter
    transcriptSegments?: TranscriptSegmentListRelationFilter
    leadExtraction?: XOR<LeadExtractionNullableScalarRelationFilter, LeadExtractionWhereInput> | null
    campaignLinks?: CampaignCallListRelationFilter
    sourceContacts?: CampaignContactListRelationFilter
  }

  export type CallSessionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    roomId?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    agentName?: SortOrderInput | SortOrder
    direction?: SortOrderInput | SortOrder
    status?: SortOrder
    initiatedAt?: SortOrder
    connectedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    durationSec?: SortOrderInput | SortOrder
    transcriptTurns?: SortOrderInput | SortOrder
    recordingUrl?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    estimatedCost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    events?: CallEventOrderByRelationAggregateInput
    transcriptSegments?: TranscriptSegmentOrderByRelationAggregateInput
    leadExtraction?: LeadExtractionOrderByWithRelationInput
    campaignLinks?: CampaignCallOrderByRelationAggregateInput
    sourceContacts?: CampaignContactOrderByRelationAggregateInput
  }

  export type CallSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CallSessionWhereInput | CallSessionWhereInput[]
    OR?: CallSessionWhereInput[]
    NOT?: CallSessionWhereInput | CallSessionWhereInput[]
    tenantId?: StringFilter<"CallSession"> | string
    roomId?: StringFilter<"CallSession"> | string
    phoneNumber?: StringNullableFilter<"CallSession"> | string | null
    agentName?: StringNullableFilter<"CallSession"> | string | null
    direction?: StringNullableFilter<"CallSession"> | string | null
    status?: EnumCallLifecycleStatusFilter<"CallSession"> | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFilter<"CallSession"> | Date | string
    connectedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    durationSec?: FloatNullableFilter<"CallSession"> | number | null
    transcriptTurns?: IntNullableFilter<"CallSession"> | number | null
    recordingUrl?: StringNullableFilter<"CallSession"> | string | null
    lastError?: StringNullableFilter<"CallSession"> | string | null
    estimatedCost?: FloatNullableFilter<"CallSession"> | number | null
    createdAt?: DateTimeFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeFilter<"CallSession"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    events?: CallEventListRelationFilter
    transcriptSegments?: TranscriptSegmentListRelationFilter
    leadExtraction?: XOR<LeadExtractionNullableScalarRelationFilter, LeadExtractionWhereInput> | null
    campaignLinks?: CampaignCallListRelationFilter
    sourceContacts?: CampaignContactListRelationFilter
  }, "id">

  export type CallSessionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    roomId?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    agentName?: SortOrderInput | SortOrder
    direction?: SortOrderInput | SortOrder
    status?: SortOrder
    initiatedAt?: SortOrder
    connectedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    durationSec?: SortOrderInput | SortOrder
    transcriptTurns?: SortOrderInput | SortOrder
    recordingUrl?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    estimatedCost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CallSessionCountOrderByAggregateInput
    _avg?: CallSessionAvgOrderByAggregateInput
    _max?: CallSessionMaxOrderByAggregateInput
    _min?: CallSessionMinOrderByAggregateInput
    _sum?: CallSessionSumOrderByAggregateInput
  }

  export type CallSessionScalarWhereWithAggregatesInput = {
    AND?: CallSessionScalarWhereWithAggregatesInput | CallSessionScalarWhereWithAggregatesInput[]
    OR?: CallSessionScalarWhereWithAggregatesInput[]
    NOT?: CallSessionScalarWhereWithAggregatesInput | CallSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallSession"> | string
    tenantId?: StringWithAggregatesFilter<"CallSession"> | string
    roomId?: StringWithAggregatesFilter<"CallSession"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    agentName?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    direction?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    status?: EnumCallLifecycleStatusWithAggregatesFilter<"CallSession"> | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeWithAggregatesFilter<"CallSession"> | Date | string
    connectedAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    failedAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    durationSec?: FloatNullableWithAggregatesFilter<"CallSession"> | number | null
    transcriptTurns?: IntNullableWithAggregatesFilter<"CallSession"> | number | null
    recordingUrl?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    lastError?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    estimatedCost?: FloatNullableWithAggregatesFilter<"CallSession"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CallSession"> | Date | string
  }

  export type CallEventWhereInput = {
    AND?: CallEventWhereInput | CallEventWhereInput[]
    OR?: CallEventWhereInput[]
    NOT?: CallEventWhereInput | CallEventWhereInput[]
    id?: StringFilter<"CallEvent"> | string
    callId?: StringFilter<"CallEvent"> | string
    tenantId?: StringFilter<"CallEvent"> | string
    eventType?: StringFilter<"CallEvent"> | string
    occurredAt?: DateTimeFilter<"CallEvent"> | Date | string
    eventId?: StringFilter<"CallEvent"> | string
    payloadJson?: StringFilter<"CallEvent"> | string
    rawEnvelope?: StringFilter<"CallEvent"> | string
    rawHeaders?: StringFilter<"CallEvent"> | string
    createdAt?: DateTimeFilter<"CallEvent"> | Date | string
    callSession?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }

  export type CallEventOrderByWithRelationInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    eventId?: SortOrder
    payloadJson?: SortOrder
    rawEnvelope?: SortOrder
    rawHeaders?: SortOrder
    createdAt?: SortOrder
    callSession?: CallSessionOrderByWithRelationInput
  }

  export type CallEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    callId_eventType_occurredAt?: CallEventCallIdEventTypeOccurredAtCompoundUniqueInput
    AND?: CallEventWhereInput | CallEventWhereInput[]
    OR?: CallEventWhereInput[]
    NOT?: CallEventWhereInput | CallEventWhereInput[]
    callId?: StringFilter<"CallEvent"> | string
    tenantId?: StringFilter<"CallEvent"> | string
    eventType?: StringFilter<"CallEvent"> | string
    occurredAt?: DateTimeFilter<"CallEvent"> | Date | string
    eventId?: StringFilter<"CallEvent"> | string
    payloadJson?: StringFilter<"CallEvent"> | string
    rawEnvelope?: StringFilter<"CallEvent"> | string
    rawHeaders?: StringFilter<"CallEvent"> | string
    createdAt?: DateTimeFilter<"CallEvent"> | Date | string
    callSession?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }, "id" | "callId_eventType_occurredAt">

  export type CallEventOrderByWithAggregationInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    eventId?: SortOrder
    payloadJson?: SortOrder
    rawEnvelope?: SortOrder
    rawHeaders?: SortOrder
    createdAt?: SortOrder
    _count?: CallEventCountOrderByAggregateInput
    _max?: CallEventMaxOrderByAggregateInput
    _min?: CallEventMinOrderByAggregateInput
  }

  export type CallEventScalarWhereWithAggregatesInput = {
    AND?: CallEventScalarWhereWithAggregatesInput | CallEventScalarWhereWithAggregatesInput[]
    OR?: CallEventScalarWhereWithAggregatesInput[]
    NOT?: CallEventScalarWhereWithAggregatesInput | CallEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallEvent"> | string
    callId?: StringWithAggregatesFilter<"CallEvent"> | string
    tenantId?: StringWithAggregatesFilter<"CallEvent"> | string
    eventType?: StringWithAggregatesFilter<"CallEvent"> | string
    occurredAt?: DateTimeWithAggregatesFilter<"CallEvent"> | Date | string
    eventId?: StringWithAggregatesFilter<"CallEvent"> | string
    payloadJson?: StringWithAggregatesFilter<"CallEvent"> | string
    rawEnvelope?: StringWithAggregatesFilter<"CallEvent"> | string
    rawHeaders?: StringWithAggregatesFilter<"CallEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CallEvent"> | Date | string
  }

  export type TranscriptSegmentWhereInput = {
    AND?: TranscriptSegmentWhereInput | TranscriptSegmentWhereInput[]
    OR?: TranscriptSegmentWhereInput[]
    NOT?: TranscriptSegmentWhereInput | TranscriptSegmentWhereInput[]
    id?: StringFilter<"TranscriptSegment"> | string
    callId?: StringFilter<"TranscriptSegment"> | string
    tenantId?: StringFilter<"TranscriptSegment"> | string
    speaker?: EnumSpeakerFilter<"TranscriptSegment"> | $Enums.Speaker
    text?: StringFilter<"TranscriptSegment"> | string
    isFinal?: BoolFilter<"TranscriptSegment"> | boolean
    sequenceNo?: IntFilter<"TranscriptSegment"> | number
    providerMessageId?: StringNullableFilter<"TranscriptSegment"> | string | null
    rawJson?: StringNullableFilter<"TranscriptSegment"> | string | null
    occurredAt?: DateTimeFilter<"TranscriptSegment"> | Date | string
    createdAt?: DateTimeFilter<"TranscriptSegment"> | Date | string
    callSession?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }

  export type TranscriptSegmentOrderByWithRelationInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    speaker?: SortOrder
    text?: SortOrder
    isFinal?: SortOrder
    sequenceNo?: SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    rawJson?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    callSession?: CallSessionOrderByWithRelationInput
  }

  export type TranscriptSegmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    callId_sequenceNo?: TranscriptSegmentCallIdSequenceNoCompoundUniqueInput
    AND?: TranscriptSegmentWhereInput | TranscriptSegmentWhereInput[]
    OR?: TranscriptSegmentWhereInput[]
    NOT?: TranscriptSegmentWhereInput | TranscriptSegmentWhereInput[]
    callId?: StringFilter<"TranscriptSegment"> | string
    tenantId?: StringFilter<"TranscriptSegment"> | string
    speaker?: EnumSpeakerFilter<"TranscriptSegment"> | $Enums.Speaker
    text?: StringFilter<"TranscriptSegment"> | string
    isFinal?: BoolFilter<"TranscriptSegment"> | boolean
    sequenceNo?: IntFilter<"TranscriptSegment"> | number
    providerMessageId?: StringNullableFilter<"TranscriptSegment"> | string | null
    rawJson?: StringNullableFilter<"TranscriptSegment"> | string | null
    occurredAt?: DateTimeFilter<"TranscriptSegment"> | Date | string
    createdAt?: DateTimeFilter<"TranscriptSegment"> | Date | string
    callSession?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }, "id" | "callId_sequenceNo">

  export type TranscriptSegmentOrderByWithAggregationInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    speaker?: SortOrder
    text?: SortOrder
    isFinal?: SortOrder
    sequenceNo?: SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    rawJson?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    _count?: TranscriptSegmentCountOrderByAggregateInput
    _avg?: TranscriptSegmentAvgOrderByAggregateInput
    _max?: TranscriptSegmentMaxOrderByAggregateInput
    _min?: TranscriptSegmentMinOrderByAggregateInput
    _sum?: TranscriptSegmentSumOrderByAggregateInput
  }

  export type TranscriptSegmentScalarWhereWithAggregatesInput = {
    AND?: TranscriptSegmentScalarWhereWithAggregatesInput | TranscriptSegmentScalarWhereWithAggregatesInput[]
    OR?: TranscriptSegmentScalarWhereWithAggregatesInput[]
    NOT?: TranscriptSegmentScalarWhereWithAggregatesInput | TranscriptSegmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TranscriptSegment"> | string
    callId?: StringWithAggregatesFilter<"TranscriptSegment"> | string
    tenantId?: StringWithAggregatesFilter<"TranscriptSegment"> | string
    speaker?: EnumSpeakerWithAggregatesFilter<"TranscriptSegment"> | $Enums.Speaker
    text?: StringWithAggregatesFilter<"TranscriptSegment"> | string
    isFinal?: BoolWithAggregatesFilter<"TranscriptSegment"> | boolean
    sequenceNo?: IntWithAggregatesFilter<"TranscriptSegment"> | number
    providerMessageId?: StringNullableWithAggregatesFilter<"TranscriptSegment"> | string | null
    rawJson?: StringNullableWithAggregatesFilter<"TranscriptSegment"> | string | null
    occurredAt?: DateTimeWithAggregatesFilter<"TranscriptSegment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TranscriptSegment"> | Date | string
  }

  export type LeadExtractionWhereInput = {
    AND?: LeadExtractionWhereInput | LeadExtractionWhereInput[]
    OR?: LeadExtractionWhereInput[]
    NOT?: LeadExtractionWhereInput | LeadExtractionWhereInput[]
    id?: StringFilter<"LeadExtraction"> | string
    callId?: StringFilter<"LeadExtraction"> | string
    tenantId?: StringFilter<"LeadExtraction"> | string
    extractedAt?: DateTimeFilter<"LeadExtraction"> | Date | string
    name?: StringNullableFilter<"LeadExtraction"> | string | null
    phone?: StringNullableFilter<"LeadExtraction"> | string | null
    summary?: StringFilter<"LeadExtraction"> | string
    confidence?: FloatNullableFilter<"LeadExtraction"> | number | null
    rawJson?: StringNullableFilter<"LeadExtraction"> | string | null
    createdAt?: DateTimeFilter<"LeadExtraction"> | Date | string
    updatedAt?: DateTimeFilter<"LeadExtraction"> | Date | string
    callSession?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }

  export type LeadExtractionOrderByWithRelationInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    extractedAt?: SortOrder
    name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    summary?: SortOrder
    confidence?: SortOrderInput | SortOrder
    rawJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    callSession?: CallSessionOrderByWithRelationInput
  }

  export type LeadExtractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    callId?: string
    AND?: LeadExtractionWhereInput | LeadExtractionWhereInput[]
    OR?: LeadExtractionWhereInput[]
    NOT?: LeadExtractionWhereInput | LeadExtractionWhereInput[]
    tenantId?: StringFilter<"LeadExtraction"> | string
    extractedAt?: DateTimeFilter<"LeadExtraction"> | Date | string
    name?: StringNullableFilter<"LeadExtraction"> | string | null
    phone?: StringNullableFilter<"LeadExtraction"> | string | null
    summary?: StringFilter<"LeadExtraction"> | string
    confidence?: FloatNullableFilter<"LeadExtraction"> | number | null
    rawJson?: StringNullableFilter<"LeadExtraction"> | string | null
    createdAt?: DateTimeFilter<"LeadExtraction"> | Date | string
    updatedAt?: DateTimeFilter<"LeadExtraction"> | Date | string
    callSession?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }, "id" | "callId">

  export type LeadExtractionOrderByWithAggregationInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    extractedAt?: SortOrder
    name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    summary?: SortOrder
    confidence?: SortOrderInput | SortOrder
    rawJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadExtractionCountOrderByAggregateInput
    _avg?: LeadExtractionAvgOrderByAggregateInput
    _max?: LeadExtractionMaxOrderByAggregateInput
    _min?: LeadExtractionMinOrderByAggregateInput
    _sum?: LeadExtractionSumOrderByAggregateInput
  }

  export type LeadExtractionScalarWhereWithAggregatesInput = {
    AND?: LeadExtractionScalarWhereWithAggregatesInput | LeadExtractionScalarWhereWithAggregatesInput[]
    OR?: LeadExtractionScalarWhereWithAggregatesInput[]
    NOT?: LeadExtractionScalarWhereWithAggregatesInput | LeadExtractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadExtraction"> | string
    callId?: StringWithAggregatesFilter<"LeadExtraction"> | string
    tenantId?: StringWithAggregatesFilter<"LeadExtraction"> | string
    extractedAt?: DateTimeWithAggregatesFilter<"LeadExtraction"> | Date | string
    name?: StringNullableWithAggregatesFilter<"LeadExtraction"> | string | null
    phone?: StringNullableWithAggregatesFilter<"LeadExtraction"> | string | null
    summary?: StringWithAggregatesFilter<"LeadExtraction"> | string
    confidence?: FloatNullableWithAggregatesFilter<"LeadExtraction"> | number | null
    rawJson?: StringNullableWithAggregatesFilter<"LeadExtraction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LeadExtraction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeadExtraction"> | Date | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    tenantId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    calls?: CampaignCallListRelationFilter
    contacts?: CampaignContactListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    calls?: CampaignCallOrderByRelationAggregateInput
    contacts?: CampaignContactOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    tenantId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    calls?: CampaignCallListRelationFilter
    contacts?: CampaignContactListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    tenantId?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    description?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusWithAggregatesFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
  }

  export type CampaignCallWhereInput = {
    AND?: CampaignCallWhereInput | CampaignCallWhereInput[]
    OR?: CampaignCallWhereInput[]
    NOT?: CampaignCallWhereInput | CampaignCallWhereInput[]
    campaignId?: StringFilter<"CampaignCall"> | string
    callId?: StringFilter<"CampaignCall"> | string
    tenantId?: StringFilter<"CampaignCall"> | string
    createdAt?: DateTimeFilter<"CampaignCall"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    call?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }

  export type CampaignCallOrderByWithRelationInput = {
    campaignId?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    call?: CallSessionOrderByWithRelationInput
  }

  export type CampaignCallWhereUniqueInput = Prisma.AtLeast<{
    campaignId_callId?: CampaignCallCampaignIdCallIdCompoundUniqueInput
    AND?: CampaignCallWhereInput | CampaignCallWhereInput[]
    OR?: CampaignCallWhereInput[]
    NOT?: CampaignCallWhereInput | CampaignCallWhereInput[]
    campaignId?: StringFilter<"CampaignCall"> | string
    callId?: StringFilter<"CampaignCall"> | string
    tenantId?: StringFilter<"CampaignCall"> | string
    createdAt?: DateTimeFilter<"CampaignCall"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    call?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }, "campaignId_callId">

  export type CampaignCallOrderByWithAggregationInput = {
    campaignId?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    _count?: CampaignCallCountOrderByAggregateInput
    _max?: CampaignCallMaxOrderByAggregateInput
    _min?: CampaignCallMinOrderByAggregateInput
  }

  export type CampaignCallScalarWhereWithAggregatesInput = {
    AND?: CampaignCallScalarWhereWithAggregatesInput | CampaignCallScalarWhereWithAggregatesInput[]
    OR?: CampaignCallScalarWhereWithAggregatesInput[]
    NOT?: CampaignCallScalarWhereWithAggregatesInput | CampaignCallScalarWhereWithAggregatesInput[]
    campaignId?: StringWithAggregatesFilter<"CampaignCall"> | string
    callId?: StringWithAggregatesFilter<"CampaignCall"> | string
    tenantId?: StringWithAggregatesFilter<"CampaignCall"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CampaignCall"> | Date | string
  }

  export type CampaignContactWhereInput = {
    AND?: CampaignContactWhereInput | CampaignContactWhereInput[]
    OR?: CampaignContactWhereInput[]
    NOT?: CampaignContactWhereInput | CampaignContactWhereInput[]
    id?: StringFilter<"CampaignContact"> | string
    campaignId?: StringFilter<"CampaignContact"> | string
    tenantId?: StringFilter<"CampaignContact"> | string
    sourceCallId?: StringNullableFilter<"CampaignContact"> | string | null
    name?: StringNullableFilter<"CampaignContact"> | string | null
    phone?: StringNullableFilter<"CampaignContact"> | string | null
    notes?: StringNullableFilter<"CampaignContact"> | string | null
    createdAt?: DateTimeFilter<"CampaignContact"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignContact"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    sourceCall?: XOR<CallSessionNullableScalarRelationFilter, CallSessionWhereInput> | null
  }

  export type CampaignContactOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    tenantId?: SortOrder
    sourceCallId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    sourceCall?: CallSessionOrderByWithRelationInput
  }

  export type CampaignContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    campaignId_sourceCallId?: CampaignContactCampaignIdSourceCallIdCompoundUniqueInput
    AND?: CampaignContactWhereInput | CampaignContactWhereInput[]
    OR?: CampaignContactWhereInput[]
    NOT?: CampaignContactWhereInput | CampaignContactWhereInput[]
    campaignId?: StringFilter<"CampaignContact"> | string
    tenantId?: StringFilter<"CampaignContact"> | string
    sourceCallId?: StringNullableFilter<"CampaignContact"> | string | null
    name?: StringNullableFilter<"CampaignContact"> | string | null
    phone?: StringNullableFilter<"CampaignContact"> | string | null
    notes?: StringNullableFilter<"CampaignContact"> | string | null
    createdAt?: DateTimeFilter<"CampaignContact"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignContact"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    sourceCall?: XOR<CallSessionNullableScalarRelationFilter, CallSessionWhereInput> | null
  }, "id" | "campaignId_sourceCallId">

  export type CampaignContactOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    tenantId?: SortOrder
    sourceCallId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignContactCountOrderByAggregateInput
    _max?: CampaignContactMaxOrderByAggregateInput
    _min?: CampaignContactMinOrderByAggregateInput
  }

  export type CampaignContactScalarWhereWithAggregatesInput = {
    AND?: CampaignContactScalarWhereWithAggregatesInput | CampaignContactScalarWhereWithAggregatesInput[]
    OR?: CampaignContactScalarWhereWithAggregatesInput[]
    NOT?: CampaignContactScalarWhereWithAggregatesInput | CampaignContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignContact"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignContact"> | string
    tenantId?: StringWithAggregatesFilter<"CampaignContact"> | string
    sourceCallId?: StringNullableWithAggregatesFilter<"CampaignContact"> | string | null
    name?: StringNullableWithAggregatesFilter<"CampaignContact"> | string | null
    phone?: StringNullableWithAggregatesFilter<"CampaignContact"> | string | null
    notes?: StringNullableWithAggregatesFilter<"CampaignContact"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CampaignContact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CampaignContact"> | Date | string
  }

  export type TenantCreateInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    callSessions?: CallSessionCreateNestedManyWithoutTenantInput
    campaigns?: CampaignCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    callSessions?: CallSessionUncheckedCreateNestedManyWithoutTenantInput
    campaigns?: CampaignUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSessions?: CallSessionUpdateManyWithoutTenantNestedInput
    campaigns?: CampaignUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSessions?: CallSessionUncheckedUpdateManyWithoutTenantNestedInput
    campaigns?: CampaignUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallSessionCreateInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCallSessionsInput
    events?: CallEventCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUncheckedCreateInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventUncheckedCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallUncheckedCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCallSessionsNestedInput
    events?: CallEventUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUncheckedUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUncheckedUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionCreateManyInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEventCreateInput = {
    id?: string
    tenantId: string
    eventType: string
    occurredAt: Date | string
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt?: Date | string
    callSession: CallSessionCreateNestedOneWithoutEventsInput
  }

  export type CallEventUncheckedCreateInput = {
    id?: string
    callId: string
    tenantId: string
    eventType: string
    occurredAt: Date | string
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt?: Date | string
  }

  export type CallEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSession?: CallSessionUpdateOneRequiredWithoutEventsNestedInput
  }

  export type CallEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEventCreateManyInput = {
    id?: string
    callId: string
    tenantId: string
    eventType: string
    occurredAt: Date | string
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt?: Date | string
  }

  export type CallEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptSegmentCreateInput = {
    id?: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal?: boolean
    sequenceNo: number
    providerMessageId?: string | null
    rawJson?: string | null
    occurredAt: Date | string
    createdAt?: Date | string
    callSession: CallSessionCreateNestedOneWithoutTranscriptSegmentsInput
  }

  export type TranscriptSegmentUncheckedCreateInput = {
    id?: string
    callId: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal?: boolean
    sequenceNo: number
    providerMessageId?: string | null
    rawJson?: string | null
    occurredAt: Date | string
    createdAt?: Date | string
  }

  export type TranscriptSegmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSession?: CallSessionUpdateOneRequiredWithoutTranscriptSegmentsNestedInput
  }

  export type TranscriptSegmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptSegmentCreateManyInput = {
    id?: string
    callId: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal?: boolean
    sequenceNo: number
    providerMessageId?: string | null
    rawJson?: string | null
    occurredAt: Date | string
    createdAt?: Date | string
  }

  export type TranscriptSegmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptSegmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadExtractionCreateInput = {
    id?: string
    tenantId: string
    extractedAt: Date | string
    name?: string | null
    phone?: string | null
    summary: string
    confidence?: number | null
    rawJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    callSession: CallSessionCreateNestedOneWithoutLeadExtractionInput
  }

  export type LeadExtractionUncheckedCreateInput = {
    id?: string
    callId: string
    tenantId: string
    extractedAt: Date | string
    name?: string | null
    phone?: string | null
    summary: string
    confidence?: number | null
    rawJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadExtractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSession?: CallSessionUpdateOneRequiredWithoutLeadExtractionNestedInput
  }

  export type LeadExtractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadExtractionCreateManyInput = {
    id?: string
    callId: string
    tenantId: string
    extractedAt: Date | string
    name?: string | null
    phone?: string | null
    summary: string
    confidence?: number | null
    rawJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadExtractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadExtractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCampaignsInput
    calls?: CampaignCallCreateNestedManyWithoutCampaignInput
    contacts?: CampaignContactCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CampaignCallUncheckedCreateNestedManyWithoutCampaignInput
    contacts?: CampaignContactUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCampaignsNestedInput
    calls?: CampaignCallUpdateManyWithoutCampaignNestedInput
    contacts?: CampaignContactUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CampaignCallUncheckedUpdateManyWithoutCampaignNestedInput
    contacts?: CampaignContactUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallCreateInput = {
    tenantId: string
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutCallsInput
    call: CallSessionCreateNestedOneWithoutCampaignLinksInput
  }

  export type CampaignCallUncheckedCreateInput = {
    campaignId: string
    callId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type CampaignCallUpdateInput = {
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutCallsNestedInput
    call?: CallSessionUpdateOneRequiredWithoutCampaignLinksNestedInput
  }

  export type CampaignCallUncheckedUpdateInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallCreateManyInput = {
    campaignId: string
    callId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type CampaignCallUpdateManyMutationInput = {
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallUncheckedUpdateManyInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactCreateInput = {
    id?: string
    tenantId: string
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutContactsInput
    sourceCall?: CallSessionCreateNestedOneWithoutSourceContactsInput
  }

  export type CampaignContactUncheckedCreateInput = {
    id?: string
    campaignId: string
    tenantId: string
    sourceCallId?: string | null
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutContactsNestedInput
    sourceCall?: CallSessionUpdateOneWithoutSourceContactsNestedInput
  }

  export type CampaignContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sourceCallId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactCreateManyInput = {
    id?: string
    campaignId: string
    tenantId: string
    sourceCallId?: string | null
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sourceCallId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPlanKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanKey | EnumPlanKeyFieldRefInput<$PrismaModel>
    in?: $Enums.PlanKey[]
    notIn?: $Enums.PlanKey[]
    not?: NestedEnumPlanKeyFilter<$PrismaModel> | $Enums.PlanKey
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CallSessionListRelationFilter = {
    every?: CallSessionWhereInput
    some?: CallSessionWhereInput
    none?: CallSessionWhereInput
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CallSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    workspaceConfigJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    workspaceConfigJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    workspaceConfigJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPlanKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanKey | EnumPlanKeyFieldRefInput<$PrismaModel>
    in?: $Enums.PlanKey[]
    notIn?: $Enums.PlanKey[]
    not?: NestedEnumPlanKeyWithAggregatesFilter<$PrismaModel> | $Enums.PlanKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanKeyFilter<$PrismaModel>
    _max?: NestedEnumPlanKeyFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCallLifecycleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CallLifecycleStatus | EnumCallLifecycleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CallLifecycleStatus[]
    notIn?: $Enums.CallLifecycleStatus[]
    not?: NestedEnumCallLifecycleStatusFilter<$PrismaModel> | $Enums.CallLifecycleStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type CallEventListRelationFilter = {
    every?: CallEventWhereInput
    some?: CallEventWhereInput
    none?: CallEventWhereInput
  }

  export type TranscriptSegmentListRelationFilter = {
    every?: TranscriptSegmentWhereInput
    some?: TranscriptSegmentWhereInput
    none?: TranscriptSegmentWhereInput
  }

  export type LeadExtractionNullableScalarRelationFilter = {
    is?: LeadExtractionWhereInput | null
    isNot?: LeadExtractionWhereInput | null
  }

  export type CampaignCallListRelationFilter = {
    every?: CampaignCallWhereInput
    some?: CampaignCallWhereInput
    none?: CampaignCallWhereInput
  }

  export type CampaignContactListRelationFilter = {
    every?: CampaignContactWhereInput
    some?: CampaignContactWhereInput
    none?: CampaignContactWhereInput
  }

  export type CallEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TranscriptSegmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCallOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CallSessionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    roomId?: SortOrder
    phoneNumber?: SortOrder
    agentName?: SortOrder
    direction?: SortOrder
    status?: SortOrder
    initiatedAt?: SortOrder
    connectedAt?: SortOrder
    completedAt?: SortOrder
    failedAt?: SortOrder
    durationSec?: SortOrder
    transcriptTurns?: SortOrder
    recordingUrl?: SortOrder
    lastError?: SortOrder
    estimatedCost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallSessionAvgOrderByAggregateInput = {
    durationSec?: SortOrder
    transcriptTurns?: SortOrder
    estimatedCost?: SortOrder
  }

  export type CallSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    roomId?: SortOrder
    phoneNumber?: SortOrder
    agentName?: SortOrder
    direction?: SortOrder
    status?: SortOrder
    initiatedAt?: SortOrder
    connectedAt?: SortOrder
    completedAt?: SortOrder
    failedAt?: SortOrder
    durationSec?: SortOrder
    transcriptTurns?: SortOrder
    recordingUrl?: SortOrder
    lastError?: SortOrder
    estimatedCost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallSessionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    roomId?: SortOrder
    phoneNumber?: SortOrder
    agentName?: SortOrder
    direction?: SortOrder
    status?: SortOrder
    initiatedAt?: SortOrder
    connectedAt?: SortOrder
    completedAt?: SortOrder
    failedAt?: SortOrder
    durationSec?: SortOrder
    transcriptTurns?: SortOrder
    recordingUrl?: SortOrder
    lastError?: SortOrder
    estimatedCost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallSessionSumOrderByAggregateInput = {
    durationSec?: SortOrder
    transcriptTurns?: SortOrder
    estimatedCost?: SortOrder
  }

  export type EnumCallLifecycleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallLifecycleStatus | EnumCallLifecycleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CallLifecycleStatus[]
    notIn?: $Enums.CallLifecycleStatus[]
    not?: NestedEnumCallLifecycleStatusWithAggregatesFilter<$PrismaModel> | $Enums.CallLifecycleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallLifecycleStatusFilter<$PrismaModel>
    _max?: NestedEnumCallLifecycleStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CallSessionScalarRelationFilter = {
    is?: CallSessionWhereInput
    isNot?: CallSessionWhereInput
  }

  export type CallEventCallIdEventTypeOccurredAtCompoundUniqueInput = {
    callId: string
    eventType: string
    occurredAt: Date | string
  }

  export type CallEventCountOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    eventId?: SortOrder
    payloadJson?: SortOrder
    rawEnvelope?: SortOrder
    rawHeaders?: SortOrder
    createdAt?: SortOrder
  }

  export type CallEventMaxOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    eventId?: SortOrder
    payloadJson?: SortOrder
    rawEnvelope?: SortOrder
    rawHeaders?: SortOrder
    createdAt?: SortOrder
  }

  export type CallEventMinOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    eventId?: SortOrder
    payloadJson?: SortOrder
    rawEnvelope?: SortOrder
    rawHeaders?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSpeakerFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[]
    notIn?: $Enums.Speaker[]
    not?: NestedEnumSpeakerFilter<$PrismaModel> | $Enums.Speaker
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TranscriptSegmentCallIdSequenceNoCompoundUniqueInput = {
    callId: string
    sequenceNo: number
  }

  export type TranscriptSegmentCountOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    speaker?: SortOrder
    text?: SortOrder
    isFinal?: SortOrder
    sequenceNo?: SortOrder
    providerMessageId?: SortOrder
    rawJson?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TranscriptSegmentAvgOrderByAggregateInput = {
    sequenceNo?: SortOrder
  }

  export type TranscriptSegmentMaxOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    speaker?: SortOrder
    text?: SortOrder
    isFinal?: SortOrder
    sequenceNo?: SortOrder
    providerMessageId?: SortOrder
    rawJson?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TranscriptSegmentMinOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    speaker?: SortOrder
    text?: SortOrder
    isFinal?: SortOrder
    sequenceNo?: SortOrder
    providerMessageId?: SortOrder
    rawJson?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TranscriptSegmentSumOrderByAggregateInput = {
    sequenceNo?: SortOrder
  }

  export type EnumSpeakerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[]
    notIn?: $Enums.Speaker[]
    not?: NestedEnumSpeakerWithAggregatesFilter<$PrismaModel> | $Enums.Speaker
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpeakerFilter<$PrismaModel>
    _max?: NestedEnumSpeakerFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type LeadExtractionCountOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    extractedAt?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    confidence?: SortOrder
    rawJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadExtractionAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type LeadExtractionMaxOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    extractedAt?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    confidence?: SortOrder
    rawJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadExtractionMinOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    extractedAt?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    confidence?: SortOrder
    rawJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadExtractionSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[]
    notIn?: $Enums.CampaignStatus[]
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[]
    notIn?: $Enums.CampaignStatus[]
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type CampaignCallCampaignIdCallIdCompoundUniqueInput = {
    campaignId: string
    callId: string
  }

  export type CampaignCallCountOrderByAggregateInput = {
    campaignId?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignCallMaxOrderByAggregateInput = {
    campaignId?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignCallMinOrderByAggregateInput = {
    campaignId?: SortOrder
    callId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type CallSessionNullableScalarRelationFilter = {
    is?: CallSessionWhereInput | null
    isNot?: CallSessionWhereInput | null
  }

  export type CampaignContactCampaignIdSourceCallIdCompoundUniqueInput = {
    campaignId: string
    sourceCallId: string
  }

  export type CampaignContactCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    tenantId?: SortOrder
    sourceCallId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignContactMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    tenantId?: SortOrder
    sourceCallId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignContactMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    tenantId?: SortOrder
    sourceCallId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallSessionCreateNestedManyWithoutTenantInput = {
    create?: XOR<CallSessionCreateWithoutTenantInput, CallSessionUncheckedCreateWithoutTenantInput> | CallSessionCreateWithoutTenantInput[] | CallSessionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CallSessionCreateOrConnectWithoutTenantInput | CallSessionCreateOrConnectWithoutTenantInput[]
    createMany?: CallSessionCreateManyTenantInputEnvelope
    connect?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
  }

  export type CampaignCreateNestedManyWithoutTenantInput = {
    create?: XOR<CampaignCreateWithoutTenantInput, CampaignUncheckedCreateWithoutTenantInput> | CampaignCreateWithoutTenantInput[] | CampaignUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutTenantInput | CampaignCreateOrConnectWithoutTenantInput[]
    createMany?: CampaignCreateManyTenantInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type CallSessionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<CallSessionCreateWithoutTenantInput, CallSessionUncheckedCreateWithoutTenantInput> | CallSessionCreateWithoutTenantInput[] | CallSessionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CallSessionCreateOrConnectWithoutTenantInput | CallSessionCreateOrConnectWithoutTenantInput[]
    createMany?: CallSessionCreateManyTenantInputEnvelope
    connect?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
  }

  export type CampaignUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<CampaignCreateWithoutTenantInput, CampaignUncheckedCreateWithoutTenantInput> | CampaignCreateWithoutTenantInput[] | CampaignUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutTenantInput | CampaignCreateOrConnectWithoutTenantInput[]
    createMany?: CampaignCreateManyTenantInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPlanKeyFieldUpdateOperationsInput = {
    set?: $Enums.PlanKey
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CallSessionUpdateManyWithoutTenantNestedInput = {
    create?: XOR<CallSessionCreateWithoutTenantInput, CallSessionUncheckedCreateWithoutTenantInput> | CallSessionCreateWithoutTenantInput[] | CallSessionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CallSessionCreateOrConnectWithoutTenantInput | CallSessionCreateOrConnectWithoutTenantInput[]
    upsert?: CallSessionUpsertWithWhereUniqueWithoutTenantInput | CallSessionUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: CallSessionCreateManyTenantInputEnvelope
    set?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    disconnect?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    delete?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    connect?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    update?: CallSessionUpdateWithWhereUniqueWithoutTenantInput | CallSessionUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: CallSessionUpdateManyWithWhereWithoutTenantInput | CallSessionUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: CallSessionScalarWhereInput | CallSessionScalarWhereInput[]
  }

  export type CampaignUpdateManyWithoutTenantNestedInput = {
    create?: XOR<CampaignCreateWithoutTenantInput, CampaignUncheckedCreateWithoutTenantInput> | CampaignCreateWithoutTenantInput[] | CampaignUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutTenantInput | CampaignCreateOrConnectWithoutTenantInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutTenantInput | CampaignUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: CampaignCreateManyTenantInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutTenantInput | CampaignUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutTenantInput | CampaignUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type CallSessionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<CallSessionCreateWithoutTenantInput, CallSessionUncheckedCreateWithoutTenantInput> | CallSessionCreateWithoutTenantInput[] | CallSessionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CallSessionCreateOrConnectWithoutTenantInput | CallSessionCreateOrConnectWithoutTenantInput[]
    upsert?: CallSessionUpsertWithWhereUniqueWithoutTenantInput | CallSessionUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: CallSessionCreateManyTenantInputEnvelope
    set?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    disconnect?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    delete?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    connect?: CallSessionWhereUniqueInput | CallSessionWhereUniqueInput[]
    update?: CallSessionUpdateWithWhereUniqueWithoutTenantInput | CallSessionUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: CallSessionUpdateManyWithWhereWithoutTenantInput | CallSessionUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: CallSessionScalarWhereInput | CallSessionScalarWhereInput[]
  }

  export type CampaignUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<CampaignCreateWithoutTenantInput, CampaignUncheckedCreateWithoutTenantInput> | CampaignCreateWithoutTenantInput[] | CampaignUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutTenantInput | CampaignCreateOrConnectWithoutTenantInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutTenantInput | CampaignUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: CampaignCreateManyTenantInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutTenantInput | CampaignUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutTenantInput | CampaignUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutCallSessionsInput = {
    create?: XOR<TenantCreateWithoutCallSessionsInput, TenantUncheckedCreateWithoutCallSessionsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCallSessionsInput
    connect?: TenantWhereUniqueInput
  }

  export type CallEventCreateNestedManyWithoutCallSessionInput = {
    create?: XOR<CallEventCreateWithoutCallSessionInput, CallEventUncheckedCreateWithoutCallSessionInput> | CallEventCreateWithoutCallSessionInput[] | CallEventUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: CallEventCreateOrConnectWithoutCallSessionInput | CallEventCreateOrConnectWithoutCallSessionInput[]
    createMany?: CallEventCreateManyCallSessionInputEnvelope
    connect?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
  }

  export type TranscriptSegmentCreateNestedManyWithoutCallSessionInput = {
    create?: XOR<TranscriptSegmentCreateWithoutCallSessionInput, TranscriptSegmentUncheckedCreateWithoutCallSessionInput> | TranscriptSegmentCreateWithoutCallSessionInput[] | TranscriptSegmentUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: TranscriptSegmentCreateOrConnectWithoutCallSessionInput | TranscriptSegmentCreateOrConnectWithoutCallSessionInput[]
    createMany?: TranscriptSegmentCreateManyCallSessionInputEnvelope
    connect?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
  }

  export type LeadExtractionCreateNestedOneWithoutCallSessionInput = {
    create?: XOR<LeadExtractionCreateWithoutCallSessionInput, LeadExtractionUncheckedCreateWithoutCallSessionInput>
    connectOrCreate?: LeadExtractionCreateOrConnectWithoutCallSessionInput
    connect?: LeadExtractionWhereUniqueInput
  }

  export type CampaignCallCreateNestedManyWithoutCallInput = {
    create?: XOR<CampaignCallCreateWithoutCallInput, CampaignCallUncheckedCreateWithoutCallInput> | CampaignCallCreateWithoutCallInput[] | CampaignCallUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCallInput | CampaignCallCreateOrConnectWithoutCallInput[]
    createMany?: CampaignCallCreateManyCallInputEnvelope
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
  }

  export type CampaignContactCreateNestedManyWithoutSourceCallInput = {
    create?: XOR<CampaignContactCreateWithoutSourceCallInput, CampaignContactUncheckedCreateWithoutSourceCallInput> | CampaignContactCreateWithoutSourceCallInput[] | CampaignContactUncheckedCreateWithoutSourceCallInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutSourceCallInput | CampaignContactCreateOrConnectWithoutSourceCallInput[]
    createMany?: CampaignContactCreateManySourceCallInputEnvelope
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
  }

  export type CallEventUncheckedCreateNestedManyWithoutCallSessionInput = {
    create?: XOR<CallEventCreateWithoutCallSessionInput, CallEventUncheckedCreateWithoutCallSessionInput> | CallEventCreateWithoutCallSessionInput[] | CallEventUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: CallEventCreateOrConnectWithoutCallSessionInput | CallEventCreateOrConnectWithoutCallSessionInput[]
    createMany?: CallEventCreateManyCallSessionInputEnvelope
    connect?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
  }

  export type TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput = {
    create?: XOR<TranscriptSegmentCreateWithoutCallSessionInput, TranscriptSegmentUncheckedCreateWithoutCallSessionInput> | TranscriptSegmentCreateWithoutCallSessionInput[] | TranscriptSegmentUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: TranscriptSegmentCreateOrConnectWithoutCallSessionInput | TranscriptSegmentCreateOrConnectWithoutCallSessionInput[]
    createMany?: TranscriptSegmentCreateManyCallSessionInputEnvelope
    connect?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
  }

  export type LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput = {
    create?: XOR<LeadExtractionCreateWithoutCallSessionInput, LeadExtractionUncheckedCreateWithoutCallSessionInput>
    connectOrCreate?: LeadExtractionCreateOrConnectWithoutCallSessionInput
    connect?: LeadExtractionWhereUniqueInput
  }

  export type CampaignCallUncheckedCreateNestedManyWithoutCallInput = {
    create?: XOR<CampaignCallCreateWithoutCallInput, CampaignCallUncheckedCreateWithoutCallInput> | CampaignCallCreateWithoutCallInput[] | CampaignCallUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCallInput | CampaignCallCreateOrConnectWithoutCallInput[]
    createMany?: CampaignCallCreateManyCallInputEnvelope
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
  }

  export type CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput = {
    create?: XOR<CampaignContactCreateWithoutSourceCallInput, CampaignContactUncheckedCreateWithoutSourceCallInput> | CampaignContactCreateWithoutSourceCallInput[] | CampaignContactUncheckedCreateWithoutSourceCallInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutSourceCallInput | CampaignContactCreateOrConnectWithoutSourceCallInput[]
    createMany?: CampaignContactCreateManySourceCallInputEnvelope
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
  }

  export type EnumCallLifecycleStatusFieldUpdateOperationsInput = {
    set?: $Enums.CallLifecycleStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TenantUpdateOneRequiredWithoutCallSessionsNestedInput = {
    create?: XOR<TenantCreateWithoutCallSessionsInput, TenantUncheckedCreateWithoutCallSessionsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCallSessionsInput
    upsert?: TenantUpsertWithoutCallSessionsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutCallSessionsInput, TenantUpdateWithoutCallSessionsInput>, TenantUncheckedUpdateWithoutCallSessionsInput>
  }

  export type CallEventUpdateManyWithoutCallSessionNestedInput = {
    create?: XOR<CallEventCreateWithoutCallSessionInput, CallEventUncheckedCreateWithoutCallSessionInput> | CallEventCreateWithoutCallSessionInput[] | CallEventUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: CallEventCreateOrConnectWithoutCallSessionInput | CallEventCreateOrConnectWithoutCallSessionInput[]
    upsert?: CallEventUpsertWithWhereUniqueWithoutCallSessionInput | CallEventUpsertWithWhereUniqueWithoutCallSessionInput[]
    createMany?: CallEventCreateManyCallSessionInputEnvelope
    set?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    disconnect?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    delete?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    connect?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    update?: CallEventUpdateWithWhereUniqueWithoutCallSessionInput | CallEventUpdateWithWhereUniqueWithoutCallSessionInput[]
    updateMany?: CallEventUpdateManyWithWhereWithoutCallSessionInput | CallEventUpdateManyWithWhereWithoutCallSessionInput[]
    deleteMany?: CallEventScalarWhereInput | CallEventScalarWhereInput[]
  }

  export type TranscriptSegmentUpdateManyWithoutCallSessionNestedInput = {
    create?: XOR<TranscriptSegmentCreateWithoutCallSessionInput, TranscriptSegmentUncheckedCreateWithoutCallSessionInput> | TranscriptSegmentCreateWithoutCallSessionInput[] | TranscriptSegmentUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: TranscriptSegmentCreateOrConnectWithoutCallSessionInput | TranscriptSegmentCreateOrConnectWithoutCallSessionInput[]
    upsert?: TranscriptSegmentUpsertWithWhereUniqueWithoutCallSessionInput | TranscriptSegmentUpsertWithWhereUniqueWithoutCallSessionInput[]
    createMany?: TranscriptSegmentCreateManyCallSessionInputEnvelope
    set?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    disconnect?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    delete?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    connect?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    update?: TranscriptSegmentUpdateWithWhereUniqueWithoutCallSessionInput | TranscriptSegmentUpdateWithWhereUniqueWithoutCallSessionInput[]
    updateMany?: TranscriptSegmentUpdateManyWithWhereWithoutCallSessionInput | TranscriptSegmentUpdateManyWithWhereWithoutCallSessionInput[]
    deleteMany?: TranscriptSegmentScalarWhereInput | TranscriptSegmentScalarWhereInput[]
  }

  export type LeadExtractionUpdateOneWithoutCallSessionNestedInput = {
    create?: XOR<LeadExtractionCreateWithoutCallSessionInput, LeadExtractionUncheckedCreateWithoutCallSessionInput>
    connectOrCreate?: LeadExtractionCreateOrConnectWithoutCallSessionInput
    upsert?: LeadExtractionUpsertWithoutCallSessionInput
    disconnect?: LeadExtractionWhereInput | boolean
    delete?: LeadExtractionWhereInput | boolean
    connect?: LeadExtractionWhereUniqueInput
    update?: XOR<XOR<LeadExtractionUpdateToOneWithWhereWithoutCallSessionInput, LeadExtractionUpdateWithoutCallSessionInput>, LeadExtractionUncheckedUpdateWithoutCallSessionInput>
  }

  export type CampaignCallUpdateManyWithoutCallNestedInput = {
    create?: XOR<CampaignCallCreateWithoutCallInput, CampaignCallUncheckedCreateWithoutCallInput> | CampaignCallCreateWithoutCallInput[] | CampaignCallUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCallInput | CampaignCallCreateOrConnectWithoutCallInput[]
    upsert?: CampaignCallUpsertWithWhereUniqueWithoutCallInput | CampaignCallUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: CampaignCallCreateManyCallInputEnvelope
    set?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    disconnect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    delete?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    update?: CampaignCallUpdateWithWhereUniqueWithoutCallInput | CampaignCallUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: CampaignCallUpdateManyWithWhereWithoutCallInput | CampaignCallUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: CampaignCallScalarWhereInput | CampaignCallScalarWhereInput[]
  }

  export type CampaignContactUpdateManyWithoutSourceCallNestedInput = {
    create?: XOR<CampaignContactCreateWithoutSourceCallInput, CampaignContactUncheckedCreateWithoutSourceCallInput> | CampaignContactCreateWithoutSourceCallInput[] | CampaignContactUncheckedCreateWithoutSourceCallInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutSourceCallInput | CampaignContactCreateOrConnectWithoutSourceCallInput[]
    upsert?: CampaignContactUpsertWithWhereUniqueWithoutSourceCallInput | CampaignContactUpsertWithWhereUniqueWithoutSourceCallInput[]
    createMany?: CampaignContactCreateManySourceCallInputEnvelope
    set?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    disconnect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    delete?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    update?: CampaignContactUpdateWithWhereUniqueWithoutSourceCallInput | CampaignContactUpdateWithWhereUniqueWithoutSourceCallInput[]
    updateMany?: CampaignContactUpdateManyWithWhereWithoutSourceCallInput | CampaignContactUpdateManyWithWhereWithoutSourceCallInput[]
    deleteMany?: CampaignContactScalarWhereInput | CampaignContactScalarWhereInput[]
  }

  export type CallEventUncheckedUpdateManyWithoutCallSessionNestedInput = {
    create?: XOR<CallEventCreateWithoutCallSessionInput, CallEventUncheckedCreateWithoutCallSessionInput> | CallEventCreateWithoutCallSessionInput[] | CallEventUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: CallEventCreateOrConnectWithoutCallSessionInput | CallEventCreateOrConnectWithoutCallSessionInput[]
    upsert?: CallEventUpsertWithWhereUniqueWithoutCallSessionInput | CallEventUpsertWithWhereUniqueWithoutCallSessionInput[]
    createMany?: CallEventCreateManyCallSessionInputEnvelope
    set?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    disconnect?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    delete?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    connect?: CallEventWhereUniqueInput | CallEventWhereUniqueInput[]
    update?: CallEventUpdateWithWhereUniqueWithoutCallSessionInput | CallEventUpdateWithWhereUniqueWithoutCallSessionInput[]
    updateMany?: CallEventUpdateManyWithWhereWithoutCallSessionInput | CallEventUpdateManyWithWhereWithoutCallSessionInput[]
    deleteMany?: CallEventScalarWhereInput | CallEventScalarWhereInput[]
  }

  export type TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput = {
    create?: XOR<TranscriptSegmentCreateWithoutCallSessionInput, TranscriptSegmentUncheckedCreateWithoutCallSessionInput> | TranscriptSegmentCreateWithoutCallSessionInput[] | TranscriptSegmentUncheckedCreateWithoutCallSessionInput[]
    connectOrCreate?: TranscriptSegmentCreateOrConnectWithoutCallSessionInput | TranscriptSegmentCreateOrConnectWithoutCallSessionInput[]
    upsert?: TranscriptSegmentUpsertWithWhereUniqueWithoutCallSessionInput | TranscriptSegmentUpsertWithWhereUniqueWithoutCallSessionInput[]
    createMany?: TranscriptSegmentCreateManyCallSessionInputEnvelope
    set?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    disconnect?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    delete?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    connect?: TranscriptSegmentWhereUniqueInput | TranscriptSegmentWhereUniqueInput[]
    update?: TranscriptSegmentUpdateWithWhereUniqueWithoutCallSessionInput | TranscriptSegmentUpdateWithWhereUniqueWithoutCallSessionInput[]
    updateMany?: TranscriptSegmentUpdateManyWithWhereWithoutCallSessionInput | TranscriptSegmentUpdateManyWithWhereWithoutCallSessionInput[]
    deleteMany?: TranscriptSegmentScalarWhereInput | TranscriptSegmentScalarWhereInput[]
  }

  export type LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput = {
    create?: XOR<LeadExtractionCreateWithoutCallSessionInput, LeadExtractionUncheckedCreateWithoutCallSessionInput>
    connectOrCreate?: LeadExtractionCreateOrConnectWithoutCallSessionInput
    upsert?: LeadExtractionUpsertWithoutCallSessionInput
    disconnect?: LeadExtractionWhereInput | boolean
    delete?: LeadExtractionWhereInput | boolean
    connect?: LeadExtractionWhereUniqueInput
    update?: XOR<XOR<LeadExtractionUpdateToOneWithWhereWithoutCallSessionInput, LeadExtractionUpdateWithoutCallSessionInput>, LeadExtractionUncheckedUpdateWithoutCallSessionInput>
  }

  export type CampaignCallUncheckedUpdateManyWithoutCallNestedInput = {
    create?: XOR<CampaignCallCreateWithoutCallInput, CampaignCallUncheckedCreateWithoutCallInput> | CampaignCallCreateWithoutCallInput[] | CampaignCallUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCallInput | CampaignCallCreateOrConnectWithoutCallInput[]
    upsert?: CampaignCallUpsertWithWhereUniqueWithoutCallInput | CampaignCallUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: CampaignCallCreateManyCallInputEnvelope
    set?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    disconnect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    delete?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    update?: CampaignCallUpdateWithWhereUniqueWithoutCallInput | CampaignCallUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: CampaignCallUpdateManyWithWhereWithoutCallInput | CampaignCallUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: CampaignCallScalarWhereInput | CampaignCallScalarWhereInput[]
  }

  export type CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput = {
    create?: XOR<CampaignContactCreateWithoutSourceCallInput, CampaignContactUncheckedCreateWithoutSourceCallInput> | CampaignContactCreateWithoutSourceCallInput[] | CampaignContactUncheckedCreateWithoutSourceCallInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutSourceCallInput | CampaignContactCreateOrConnectWithoutSourceCallInput[]
    upsert?: CampaignContactUpsertWithWhereUniqueWithoutSourceCallInput | CampaignContactUpsertWithWhereUniqueWithoutSourceCallInput[]
    createMany?: CampaignContactCreateManySourceCallInputEnvelope
    set?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    disconnect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    delete?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    update?: CampaignContactUpdateWithWhereUniqueWithoutSourceCallInput | CampaignContactUpdateWithWhereUniqueWithoutSourceCallInput[]
    updateMany?: CampaignContactUpdateManyWithWhereWithoutSourceCallInput | CampaignContactUpdateManyWithWhereWithoutSourceCallInput[]
    deleteMany?: CampaignContactScalarWhereInput | CampaignContactScalarWhereInput[]
  }

  export type CallSessionCreateNestedOneWithoutEventsInput = {
    create?: XOR<CallSessionCreateWithoutEventsInput, CallSessionUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutEventsInput
    connect?: CallSessionWhereUniqueInput
  }

  export type CallSessionUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<CallSessionCreateWithoutEventsInput, CallSessionUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutEventsInput
    upsert?: CallSessionUpsertWithoutEventsInput
    connect?: CallSessionWhereUniqueInput
    update?: XOR<XOR<CallSessionUpdateToOneWithWhereWithoutEventsInput, CallSessionUpdateWithoutEventsInput>, CallSessionUncheckedUpdateWithoutEventsInput>
  }

  export type CallSessionCreateNestedOneWithoutTranscriptSegmentsInput = {
    create?: XOR<CallSessionCreateWithoutTranscriptSegmentsInput, CallSessionUncheckedCreateWithoutTranscriptSegmentsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutTranscriptSegmentsInput
    connect?: CallSessionWhereUniqueInput
  }

  export type EnumSpeakerFieldUpdateOperationsInput = {
    set?: $Enums.Speaker
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CallSessionUpdateOneRequiredWithoutTranscriptSegmentsNestedInput = {
    create?: XOR<CallSessionCreateWithoutTranscriptSegmentsInput, CallSessionUncheckedCreateWithoutTranscriptSegmentsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutTranscriptSegmentsInput
    upsert?: CallSessionUpsertWithoutTranscriptSegmentsInput
    connect?: CallSessionWhereUniqueInput
    update?: XOR<XOR<CallSessionUpdateToOneWithWhereWithoutTranscriptSegmentsInput, CallSessionUpdateWithoutTranscriptSegmentsInput>, CallSessionUncheckedUpdateWithoutTranscriptSegmentsInput>
  }

  export type CallSessionCreateNestedOneWithoutLeadExtractionInput = {
    create?: XOR<CallSessionCreateWithoutLeadExtractionInput, CallSessionUncheckedCreateWithoutLeadExtractionInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutLeadExtractionInput
    connect?: CallSessionWhereUniqueInput
  }

  export type CallSessionUpdateOneRequiredWithoutLeadExtractionNestedInput = {
    create?: XOR<CallSessionCreateWithoutLeadExtractionInput, CallSessionUncheckedCreateWithoutLeadExtractionInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutLeadExtractionInput
    upsert?: CallSessionUpsertWithoutLeadExtractionInput
    connect?: CallSessionWhereUniqueInput
    update?: XOR<XOR<CallSessionUpdateToOneWithWhereWithoutLeadExtractionInput, CallSessionUpdateWithoutLeadExtractionInput>, CallSessionUncheckedUpdateWithoutLeadExtractionInput>
  }

  export type TenantCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<TenantCreateWithoutCampaignsInput, TenantUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCampaignsInput
    connect?: TenantWhereUniqueInput
  }

  export type CampaignCallCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignCallCreateWithoutCampaignInput, CampaignCallUncheckedCreateWithoutCampaignInput> | CampaignCallCreateWithoutCampaignInput[] | CampaignCallUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCampaignInput | CampaignCallCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignCallCreateManyCampaignInputEnvelope
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
  }

  export type CampaignContactCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignContactCreateWithoutCampaignInput, CampaignContactUncheckedCreateWithoutCampaignInput> | CampaignContactCreateWithoutCampaignInput[] | CampaignContactUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutCampaignInput | CampaignContactCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignContactCreateManyCampaignInputEnvelope
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
  }

  export type CampaignCallUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignCallCreateWithoutCampaignInput, CampaignCallUncheckedCreateWithoutCampaignInput> | CampaignCallCreateWithoutCampaignInput[] | CampaignCallUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCampaignInput | CampaignCallCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignCallCreateManyCampaignInputEnvelope
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
  }

  export type CampaignContactUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignContactCreateWithoutCampaignInput, CampaignContactUncheckedCreateWithoutCampaignInput> | CampaignContactCreateWithoutCampaignInput[] | CampaignContactUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutCampaignInput | CampaignContactCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignContactCreateManyCampaignInputEnvelope
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
  }

  export type EnumCampaignStatusFieldUpdateOperationsInput = {
    set?: $Enums.CampaignStatus
  }

  export type TenantUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<TenantCreateWithoutCampaignsInput, TenantUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCampaignsInput
    upsert?: TenantUpsertWithoutCampaignsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutCampaignsInput, TenantUpdateWithoutCampaignsInput>, TenantUncheckedUpdateWithoutCampaignsInput>
  }

  export type CampaignCallUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignCallCreateWithoutCampaignInput, CampaignCallUncheckedCreateWithoutCampaignInput> | CampaignCallCreateWithoutCampaignInput[] | CampaignCallUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCampaignInput | CampaignCallCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignCallUpsertWithWhereUniqueWithoutCampaignInput | CampaignCallUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignCallCreateManyCampaignInputEnvelope
    set?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    disconnect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    delete?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    update?: CampaignCallUpdateWithWhereUniqueWithoutCampaignInput | CampaignCallUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignCallUpdateManyWithWhereWithoutCampaignInput | CampaignCallUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignCallScalarWhereInput | CampaignCallScalarWhereInput[]
  }

  export type CampaignContactUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignContactCreateWithoutCampaignInput, CampaignContactUncheckedCreateWithoutCampaignInput> | CampaignContactCreateWithoutCampaignInput[] | CampaignContactUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutCampaignInput | CampaignContactCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignContactUpsertWithWhereUniqueWithoutCampaignInput | CampaignContactUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignContactCreateManyCampaignInputEnvelope
    set?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    disconnect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    delete?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    update?: CampaignContactUpdateWithWhereUniqueWithoutCampaignInput | CampaignContactUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignContactUpdateManyWithWhereWithoutCampaignInput | CampaignContactUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignContactScalarWhereInput | CampaignContactScalarWhereInput[]
  }

  export type CampaignCallUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignCallCreateWithoutCampaignInput, CampaignCallUncheckedCreateWithoutCampaignInput> | CampaignCallCreateWithoutCampaignInput[] | CampaignCallUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignCallCreateOrConnectWithoutCampaignInput | CampaignCallCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignCallUpsertWithWhereUniqueWithoutCampaignInput | CampaignCallUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignCallCreateManyCampaignInputEnvelope
    set?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    disconnect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    delete?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    connect?: CampaignCallWhereUniqueInput | CampaignCallWhereUniqueInput[]
    update?: CampaignCallUpdateWithWhereUniqueWithoutCampaignInput | CampaignCallUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignCallUpdateManyWithWhereWithoutCampaignInput | CampaignCallUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignCallScalarWhereInput | CampaignCallScalarWhereInput[]
  }

  export type CampaignContactUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignContactCreateWithoutCampaignInput, CampaignContactUncheckedCreateWithoutCampaignInput> | CampaignContactCreateWithoutCampaignInput[] | CampaignContactUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignContactCreateOrConnectWithoutCampaignInput | CampaignContactCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignContactUpsertWithWhereUniqueWithoutCampaignInput | CampaignContactUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignContactCreateManyCampaignInputEnvelope
    set?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    disconnect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    delete?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    connect?: CampaignContactWhereUniqueInput | CampaignContactWhereUniqueInput[]
    update?: CampaignContactUpdateWithWhereUniqueWithoutCampaignInput | CampaignContactUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignContactUpdateManyWithWhereWithoutCampaignInput | CampaignContactUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignContactScalarWhereInput | CampaignContactScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutCallsInput = {
    create?: XOR<CampaignCreateWithoutCallsInput, CampaignUncheckedCreateWithoutCallsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCallsInput
    connect?: CampaignWhereUniqueInput
  }

  export type CallSessionCreateNestedOneWithoutCampaignLinksInput = {
    create?: XOR<CallSessionCreateWithoutCampaignLinksInput, CallSessionUncheckedCreateWithoutCampaignLinksInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutCampaignLinksInput
    connect?: CallSessionWhereUniqueInput
  }

  export type CampaignUpdateOneRequiredWithoutCallsNestedInput = {
    create?: XOR<CampaignCreateWithoutCallsInput, CampaignUncheckedCreateWithoutCallsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCallsInput
    upsert?: CampaignUpsertWithoutCallsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutCallsInput, CampaignUpdateWithoutCallsInput>, CampaignUncheckedUpdateWithoutCallsInput>
  }

  export type CallSessionUpdateOneRequiredWithoutCampaignLinksNestedInput = {
    create?: XOR<CallSessionCreateWithoutCampaignLinksInput, CallSessionUncheckedCreateWithoutCampaignLinksInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutCampaignLinksInput
    upsert?: CallSessionUpsertWithoutCampaignLinksInput
    connect?: CallSessionWhereUniqueInput
    update?: XOR<XOR<CallSessionUpdateToOneWithWhereWithoutCampaignLinksInput, CallSessionUpdateWithoutCampaignLinksInput>, CallSessionUncheckedUpdateWithoutCampaignLinksInput>
  }

  export type CampaignCreateNestedOneWithoutContactsInput = {
    create?: XOR<CampaignCreateWithoutContactsInput, CampaignUncheckedCreateWithoutContactsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutContactsInput
    connect?: CampaignWhereUniqueInput
  }

  export type CallSessionCreateNestedOneWithoutSourceContactsInput = {
    create?: XOR<CallSessionCreateWithoutSourceContactsInput, CallSessionUncheckedCreateWithoutSourceContactsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutSourceContactsInput
    connect?: CallSessionWhereUniqueInput
  }

  export type CampaignUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<CampaignCreateWithoutContactsInput, CampaignUncheckedCreateWithoutContactsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutContactsInput
    upsert?: CampaignUpsertWithoutContactsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutContactsInput, CampaignUpdateWithoutContactsInput>, CampaignUncheckedUpdateWithoutContactsInput>
  }

  export type CallSessionUpdateOneWithoutSourceContactsNestedInput = {
    create?: XOR<CallSessionCreateWithoutSourceContactsInput, CallSessionUncheckedCreateWithoutSourceContactsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutSourceContactsInput
    upsert?: CallSessionUpsertWithoutSourceContactsInput
    disconnect?: CallSessionWhereInput | boolean
    delete?: CallSessionWhereInput | boolean
    connect?: CallSessionWhereUniqueInput
    update?: XOR<XOR<CallSessionUpdateToOneWithWhereWithoutSourceContactsInput, CallSessionUpdateWithoutSourceContactsInput>, CallSessionUncheckedUpdateWithoutSourceContactsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPlanKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanKey | EnumPlanKeyFieldRefInput<$PrismaModel>
    in?: $Enums.PlanKey[]
    notIn?: $Enums.PlanKey[]
    not?: NestedEnumPlanKeyFilter<$PrismaModel> | $Enums.PlanKey
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPlanKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanKey | EnumPlanKeyFieldRefInput<$PrismaModel>
    in?: $Enums.PlanKey[]
    notIn?: $Enums.PlanKey[]
    not?: NestedEnumPlanKeyWithAggregatesFilter<$PrismaModel> | $Enums.PlanKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanKeyFilter<$PrismaModel>
    _max?: NestedEnumPlanKeyFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCallLifecycleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CallLifecycleStatus | EnumCallLifecycleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CallLifecycleStatus[]
    notIn?: $Enums.CallLifecycleStatus[]
    not?: NestedEnumCallLifecycleStatusFilter<$PrismaModel> | $Enums.CallLifecycleStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCallLifecycleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallLifecycleStatus | EnumCallLifecycleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CallLifecycleStatus[]
    notIn?: $Enums.CallLifecycleStatus[]
    not?: NestedEnumCallLifecycleStatusWithAggregatesFilter<$PrismaModel> | $Enums.CallLifecycleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallLifecycleStatusFilter<$PrismaModel>
    _max?: NestedEnumCallLifecycleStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumSpeakerFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[]
    notIn?: $Enums.Speaker[]
    not?: NestedEnumSpeakerFilter<$PrismaModel> | $Enums.Speaker
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSpeakerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Speaker | EnumSpeakerFieldRefInput<$PrismaModel>
    in?: $Enums.Speaker[]
    notIn?: $Enums.Speaker[]
    not?: NestedEnumSpeakerWithAggregatesFilter<$PrismaModel> | $Enums.Speaker
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpeakerFilter<$PrismaModel>
    _max?: NestedEnumSpeakerFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[]
    notIn?: $Enums.CampaignStatus[]
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[]
    notIn?: $Enums.CampaignStatus[]
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type CallSessionCreateWithoutTenantInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUncheckedCreateWithoutTenantInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventUncheckedCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallUncheckedCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionCreateOrConnectWithoutTenantInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutTenantInput, CallSessionUncheckedCreateWithoutTenantInput>
  }

  export type CallSessionCreateManyTenantInputEnvelope = {
    data: CallSessionCreateManyTenantInput | CallSessionCreateManyTenantInput[]
  }

  export type CampaignCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CampaignCallCreateNestedManyWithoutCampaignInput
    contacts?: CampaignContactCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CampaignCallUncheckedCreateNestedManyWithoutCampaignInput
    contacts?: CampaignContactUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutTenantInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutTenantInput, CampaignUncheckedCreateWithoutTenantInput>
  }

  export type CampaignCreateManyTenantInputEnvelope = {
    data: CampaignCreateManyTenantInput | CampaignCreateManyTenantInput[]
  }

  export type CallSessionUpsertWithWhereUniqueWithoutTenantInput = {
    where: CallSessionWhereUniqueInput
    update: XOR<CallSessionUpdateWithoutTenantInput, CallSessionUncheckedUpdateWithoutTenantInput>
    create: XOR<CallSessionCreateWithoutTenantInput, CallSessionUncheckedCreateWithoutTenantInput>
  }

  export type CallSessionUpdateWithWhereUniqueWithoutTenantInput = {
    where: CallSessionWhereUniqueInput
    data: XOR<CallSessionUpdateWithoutTenantInput, CallSessionUncheckedUpdateWithoutTenantInput>
  }

  export type CallSessionUpdateManyWithWhereWithoutTenantInput = {
    where: CallSessionScalarWhereInput
    data: XOR<CallSessionUpdateManyMutationInput, CallSessionUncheckedUpdateManyWithoutTenantInput>
  }

  export type CallSessionScalarWhereInput = {
    AND?: CallSessionScalarWhereInput | CallSessionScalarWhereInput[]
    OR?: CallSessionScalarWhereInput[]
    NOT?: CallSessionScalarWhereInput | CallSessionScalarWhereInput[]
    id?: StringFilter<"CallSession"> | string
    tenantId?: StringFilter<"CallSession"> | string
    roomId?: StringFilter<"CallSession"> | string
    phoneNumber?: StringNullableFilter<"CallSession"> | string | null
    agentName?: StringNullableFilter<"CallSession"> | string | null
    direction?: StringNullableFilter<"CallSession"> | string | null
    status?: EnumCallLifecycleStatusFilter<"CallSession"> | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFilter<"CallSession"> | Date | string
    connectedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    durationSec?: FloatNullableFilter<"CallSession"> | number | null
    transcriptTurns?: IntNullableFilter<"CallSession"> | number | null
    recordingUrl?: StringNullableFilter<"CallSession"> | string | null
    lastError?: StringNullableFilter<"CallSession"> | string | null
    estimatedCost?: FloatNullableFilter<"CallSession"> | number | null
    createdAt?: DateTimeFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeFilter<"CallSession"> | Date | string
  }

  export type CampaignUpsertWithWhereUniqueWithoutTenantInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutTenantInput, CampaignUncheckedUpdateWithoutTenantInput>
    create: XOR<CampaignCreateWithoutTenantInput, CampaignUncheckedCreateWithoutTenantInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutTenantInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutTenantInput, CampaignUncheckedUpdateWithoutTenantInput>
  }

  export type CampaignUpdateManyWithWhereWithoutTenantInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutTenantInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    tenantId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }

  export type TenantCreateWithoutCallSessionsInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutCallSessionsInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: CampaignUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutCallSessionsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutCallSessionsInput, TenantUncheckedCreateWithoutCallSessionsInput>
  }

  export type CallEventCreateWithoutCallSessionInput = {
    id?: string
    tenantId: string
    eventType: string
    occurredAt: Date | string
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt?: Date | string
  }

  export type CallEventUncheckedCreateWithoutCallSessionInput = {
    id?: string
    tenantId: string
    eventType: string
    occurredAt: Date | string
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt?: Date | string
  }

  export type CallEventCreateOrConnectWithoutCallSessionInput = {
    where: CallEventWhereUniqueInput
    create: XOR<CallEventCreateWithoutCallSessionInput, CallEventUncheckedCreateWithoutCallSessionInput>
  }

  export type CallEventCreateManyCallSessionInputEnvelope = {
    data: CallEventCreateManyCallSessionInput | CallEventCreateManyCallSessionInput[]
  }

  export type TranscriptSegmentCreateWithoutCallSessionInput = {
    id?: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal?: boolean
    sequenceNo: number
    providerMessageId?: string | null
    rawJson?: string | null
    occurredAt: Date | string
    createdAt?: Date | string
  }

  export type TranscriptSegmentUncheckedCreateWithoutCallSessionInput = {
    id?: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal?: boolean
    sequenceNo: number
    providerMessageId?: string | null
    rawJson?: string | null
    occurredAt: Date | string
    createdAt?: Date | string
  }

  export type TranscriptSegmentCreateOrConnectWithoutCallSessionInput = {
    where: TranscriptSegmentWhereUniqueInput
    create: XOR<TranscriptSegmentCreateWithoutCallSessionInput, TranscriptSegmentUncheckedCreateWithoutCallSessionInput>
  }

  export type TranscriptSegmentCreateManyCallSessionInputEnvelope = {
    data: TranscriptSegmentCreateManyCallSessionInput | TranscriptSegmentCreateManyCallSessionInput[]
  }

  export type LeadExtractionCreateWithoutCallSessionInput = {
    id?: string
    tenantId: string
    extractedAt: Date | string
    name?: string | null
    phone?: string | null
    summary: string
    confidence?: number | null
    rawJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadExtractionUncheckedCreateWithoutCallSessionInput = {
    id?: string
    tenantId: string
    extractedAt: Date | string
    name?: string | null
    phone?: string | null
    summary: string
    confidence?: number | null
    rawJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadExtractionCreateOrConnectWithoutCallSessionInput = {
    where: LeadExtractionWhereUniqueInput
    create: XOR<LeadExtractionCreateWithoutCallSessionInput, LeadExtractionUncheckedCreateWithoutCallSessionInput>
  }

  export type CampaignCallCreateWithoutCallInput = {
    tenantId: string
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutCallsInput
  }

  export type CampaignCallUncheckedCreateWithoutCallInput = {
    campaignId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type CampaignCallCreateOrConnectWithoutCallInput = {
    where: CampaignCallWhereUniqueInput
    create: XOR<CampaignCallCreateWithoutCallInput, CampaignCallUncheckedCreateWithoutCallInput>
  }

  export type CampaignCallCreateManyCallInputEnvelope = {
    data: CampaignCallCreateManyCallInput | CampaignCallCreateManyCallInput[]
  }

  export type CampaignContactCreateWithoutSourceCallInput = {
    id?: string
    tenantId: string
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutContactsInput
  }

  export type CampaignContactUncheckedCreateWithoutSourceCallInput = {
    id?: string
    campaignId: string
    tenantId: string
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignContactCreateOrConnectWithoutSourceCallInput = {
    where: CampaignContactWhereUniqueInput
    create: XOR<CampaignContactCreateWithoutSourceCallInput, CampaignContactUncheckedCreateWithoutSourceCallInput>
  }

  export type CampaignContactCreateManySourceCallInputEnvelope = {
    data: CampaignContactCreateManySourceCallInput | CampaignContactCreateManySourceCallInput[]
  }

  export type TenantUpsertWithoutCallSessionsInput = {
    update: XOR<TenantUpdateWithoutCallSessionsInput, TenantUncheckedUpdateWithoutCallSessionsInput>
    create: XOR<TenantCreateWithoutCallSessionsInput, TenantUncheckedCreateWithoutCallSessionsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutCallSessionsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutCallSessionsInput, TenantUncheckedUpdateWithoutCallSessionsInput>
  }

  export type TenantUpdateWithoutCallSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutCallSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: CampaignUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type CallEventUpsertWithWhereUniqueWithoutCallSessionInput = {
    where: CallEventWhereUniqueInput
    update: XOR<CallEventUpdateWithoutCallSessionInput, CallEventUncheckedUpdateWithoutCallSessionInput>
    create: XOR<CallEventCreateWithoutCallSessionInput, CallEventUncheckedCreateWithoutCallSessionInput>
  }

  export type CallEventUpdateWithWhereUniqueWithoutCallSessionInput = {
    where: CallEventWhereUniqueInput
    data: XOR<CallEventUpdateWithoutCallSessionInput, CallEventUncheckedUpdateWithoutCallSessionInput>
  }

  export type CallEventUpdateManyWithWhereWithoutCallSessionInput = {
    where: CallEventScalarWhereInput
    data: XOR<CallEventUpdateManyMutationInput, CallEventUncheckedUpdateManyWithoutCallSessionInput>
  }

  export type CallEventScalarWhereInput = {
    AND?: CallEventScalarWhereInput | CallEventScalarWhereInput[]
    OR?: CallEventScalarWhereInput[]
    NOT?: CallEventScalarWhereInput | CallEventScalarWhereInput[]
    id?: StringFilter<"CallEvent"> | string
    callId?: StringFilter<"CallEvent"> | string
    tenantId?: StringFilter<"CallEvent"> | string
    eventType?: StringFilter<"CallEvent"> | string
    occurredAt?: DateTimeFilter<"CallEvent"> | Date | string
    eventId?: StringFilter<"CallEvent"> | string
    payloadJson?: StringFilter<"CallEvent"> | string
    rawEnvelope?: StringFilter<"CallEvent"> | string
    rawHeaders?: StringFilter<"CallEvent"> | string
    createdAt?: DateTimeFilter<"CallEvent"> | Date | string
  }

  export type TranscriptSegmentUpsertWithWhereUniqueWithoutCallSessionInput = {
    where: TranscriptSegmentWhereUniqueInput
    update: XOR<TranscriptSegmentUpdateWithoutCallSessionInput, TranscriptSegmentUncheckedUpdateWithoutCallSessionInput>
    create: XOR<TranscriptSegmentCreateWithoutCallSessionInput, TranscriptSegmentUncheckedCreateWithoutCallSessionInput>
  }

  export type TranscriptSegmentUpdateWithWhereUniqueWithoutCallSessionInput = {
    where: TranscriptSegmentWhereUniqueInput
    data: XOR<TranscriptSegmentUpdateWithoutCallSessionInput, TranscriptSegmentUncheckedUpdateWithoutCallSessionInput>
  }

  export type TranscriptSegmentUpdateManyWithWhereWithoutCallSessionInput = {
    where: TranscriptSegmentScalarWhereInput
    data: XOR<TranscriptSegmentUpdateManyMutationInput, TranscriptSegmentUncheckedUpdateManyWithoutCallSessionInput>
  }

  export type TranscriptSegmentScalarWhereInput = {
    AND?: TranscriptSegmentScalarWhereInput | TranscriptSegmentScalarWhereInput[]
    OR?: TranscriptSegmentScalarWhereInput[]
    NOT?: TranscriptSegmentScalarWhereInput | TranscriptSegmentScalarWhereInput[]
    id?: StringFilter<"TranscriptSegment"> | string
    callId?: StringFilter<"TranscriptSegment"> | string
    tenantId?: StringFilter<"TranscriptSegment"> | string
    speaker?: EnumSpeakerFilter<"TranscriptSegment"> | $Enums.Speaker
    text?: StringFilter<"TranscriptSegment"> | string
    isFinal?: BoolFilter<"TranscriptSegment"> | boolean
    sequenceNo?: IntFilter<"TranscriptSegment"> | number
    providerMessageId?: StringNullableFilter<"TranscriptSegment"> | string | null
    rawJson?: StringNullableFilter<"TranscriptSegment"> | string | null
    occurredAt?: DateTimeFilter<"TranscriptSegment"> | Date | string
    createdAt?: DateTimeFilter<"TranscriptSegment"> | Date | string
  }

  export type LeadExtractionUpsertWithoutCallSessionInput = {
    update: XOR<LeadExtractionUpdateWithoutCallSessionInput, LeadExtractionUncheckedUpdateWithoutCallSessionInput>
    create: XOR<LeadExtractionCreateWithoutCallSessionInput, LeadExtractionUncheckedCreateWithoutCallSessionInput>
    where?: LeadExtractionWhereInput
  }

  export type LeadExtractionUpdateToOneWithWhereWithoutCallSessionInput = {
    where?: LeadExtractionWhereInput
    data: XOR<LeadExtractionUpdateWithoutCallSessionInput, LeadExtractionUncheckedUpdateWithoutCallSessionInput>
  }

  export type LeadExtractionUpdateWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadExtractionUncheckedUpdateWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallUpsertWithWhereUniqueWithoutCallInput = {
    where: CampaignCallWhereUniqueInput
    update: XOR<CampaignCallUpdateWithoutCallInput, CampaignCallUncheckedUpdateWithoutCallInput>
    create: XOR<CampaignCallCreateWithoutCallInput, CampaignCallUncheckedCreateWithoutCallInput>
  }

  export type CampaignCallUpdateWithWhereUniqueWithoutCallInput = {
    where: CampaignCallWhereUniqueInput
    data: XOR<CampaignCallUpdateWithoutCallInput, CampaignCallUncheckedUpdateWithoutCallInput>
  }

  export type CampaignCallUpdateManyWithWhereWithoutCallInput = {
    where: CampaignCallScalarWhereInput
    data: XOR<CampaignCallUpdateManyMutationInput, CampaignCallUncheckedUpdateManyWithoutCallInput>
  }

  export type CampaignCallScalarWhereInput = {
    AND?: CampaignCallScalarWhereInput | CampaignCallScalarWhereInput[]
    OR?: CampaignCallScalarWhereInput[]
    NOT?: CampaignCallScalarWhereInput | CampaignCallScalarWhereInput[]
    campaignId?: StringFilter<"CampaignCall"> | string
    callId?: StringFilter<"CampaignCall"> | string
    tenantId?: StringFilter<"CampaignCall"> | string
    createdAt?: DateTimeFilter<"CampaignCall"> | Date | string
  }

  export type CampaignContactUpsertWithWhereUniqueWithoutSourceCallInput = {
    where: CampaignContactWhereUniqueInput
    update: XOR<CampaignContactUpdateWithoutSourceCallInput, CampaignContactUncheckedUpdateWithoutSourceCallInput>
    create: XOR<CampaignContactCreateWithoutSourceCallInput, CampaignContactUncheckedCreateWithoutSourceCallInput>
  }

  export type CampaignContactUpdateWithWhereUniqueWithoutSourceCallInput = {
    where: CampaignContactWhereUniqueInput
    data: XOR<CampaignContactUpdateWithoutSourceCallInput, CampaignContactUncheckedUpdateWithoutSourceCallInput>
  }

  export type CampaignContactUpdateManyWithWhereWithoutSourceCallInput = {
    where: CampaignContactScalarWhereInput
    data: XOR<CampaignContactUpdateManyMutationInput, CampaignContactUncheckedUpdateManyWithoutSourceCallInput>
  }

  export type CampaignContactScalarWhereInput = {
    AND?: CampaignContactScalarWhereInput | CampaignContactScalarWhereInput[]
    OR?: CampaignContactScalarWhereInput[]
    NOT?: CampaignContactScalarWhereInput | CampaignContactScalarWhereInput[]
    id?: StringFilter<"CampaignContact"> | string
    campaignId?: StringFilter<"CampaignContact"> | string
    tenantId?: StringFilter<"CampaignContact"> | string
    sourceCallId?: StringNullableFilter<"CampaignContact"> | string | null
    name?: StringNullableFilter<"CampaignContact"> | string | null
    phone?: StringNullableFilter<"CampaignContact"> | string | null
    notes?: StringNullableFilter<"CampaignContact"> | string | null
    createdAt?: DateTimeFilter<"CampaignContact"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignContact"> | Date | string
  }

  export type CallSessionCreateWithoutEventsInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCallSessionsInput
    transcriptSegments?: TranscriptSegmentCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUncheckedCreateWithoutEventsInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transcriptSegments?: TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallUncheckedCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionCreateOrConnectWithoutEventsInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutEventsInput, CallSessionUncheckedCreateWithoutEventsInput>
  }

  export type CallSessionUpsertWithoutEventsInput = {
    update: XOR<CallSessionUpdateWithoutEventsInput, CallSessionUncheckedUpdateWithoutEventsInput>
    create: XOR<CallSessionCreateWithoutEventsInput, CallSessionUncheckedCreateWithoutEventsInput>
    where?: CallSessionWhereInput
  }

  export type CallSessionUpdateToOneWithWhereWithoutEventsInput = {
    where?: CallSessionWhereInput
    data: XOR<CallSessionUpdateWithoutEventsInput, CallSessionUncheckedUpdateWithoutEventsInput>
  }

  export type CallSessionUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCallSessionsNestedInput
    transcriptSegments?: TranscriptSegmentUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transcriptSegments?: TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUncheckedUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionCreateWithoutTranscriptSegmentsInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCallSessionsInput
    events?: CallEventCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUncheckedCreateWithoutTranscriptSegmentsInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventUncheckedCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallUncheckedCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionCreateOrConnectWithoutTranscriptSegmentsInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutTranscriptSegmentsInput, CallSessionUncheckedCreateWithoutTranscriptSegmentsInput>
  }

  export type CallSessionUpsertWithoutTranscriptSegmentsInput = {
    update: XOR<CallSessionUpdateWithoutTranscriptSegmentsInput, CallSessionUncheckedUpdateWithoutTranscriptSegmentsInput>
    create: XOR<CallSessionCreateWithoutTranscriptSegmentsInput, CallSessionUncheckedCreateWithoutTranscriptSegmentsInput>
    where?: CallSessionWhereInput
  }

  export type CallSessionUpdateToOneWithWhereWithoutTranscriptSegmentsInput = {
    where?: CallSessionWhereInput
    data: XOR<CallSessionUpdateWithoutTranscriptSegmentsInput, CallSessionUncheckedUpdateWithoutTranscriptSegmentsInput>
  }

  export type CallSessionUpdateWithoutTranscriptSegmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCallSessionsNestedInput
    events?: CallEventUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateWithoutTranscriptSegmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUncheckedUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUncheckedUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionCreateWithoutLeadExtractionInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCallSessionsInput
    events?: CallEventCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentCreateNestedManyWithoutCallSessionInput
    campaignLinks?: CampaignCallCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUncheckedCreateWithoutLeadExtractionInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventUncheckedCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput
    campaignLinks?: CampaignCallUncheckedCreateNestedManyWithoutCallInput
    sourceContacts?: CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionCreateOrConnectWithoutLeadExtractionInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutLeadExtractionInput, CallSessionUncheckedCreateWithoutLeadExtractionInput>
  }

  export type CallSessionUpsertWithoutLeadExtractionInput = {
    update: XOR<CallSessionUpdateWithoutLeadExtractionInput, CallSessionUncheckedUpdateWithoutLeadExtractionInput>
    create: XOR<CallSessionCreateWithoutLeadExtractionInput, CallSessionUncheckedCreateWithoutLeadExtractionInput>
    where?: CallSessionWhereInput
  }

  export type CallSessionUpdateToOneWithWhereWithoutLeadExtractionInput = {
    where?: CallSessionWhereInput
    data: XOR<CallSessionUpdateWithoutLeadExtractionInput, CallSessionUncheckedUpdateWithoutLeadExtractionInput>
  }

  export type CallSessionUpdateWithoutLeadExtractionInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCallSessionsNestedInput
    events?: CallEventUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUpdateManyWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateWithoutLeadExtractionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUncheckedUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUncheckedUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput
  }

  export type TenantCreateWithoutCampaignsInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    callSessions?: CallSessionCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutCampaignsInput = {
    id: string
    name?: string | null
    plan?: $Enums.PlanKey
    workspaceConfigJson?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    callSessions?: CallSessionUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutCampaignsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutCampaignsInput, TenantUncheckedCreateWithoutCampaignsInput>
  }

  export type CampaignCallCreateWithoutCampaignInput = {
    tenantId: string
    createdAt?: Date | string
    call: CallSessionCreateNestedOneWithoutCampaignLinksInput
  }

  export type CampaignCallUncheckedCreateWithoutCampaignInput = {
    callId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type CampaignCallCreateOrConnectWithoutCampaignInput = {
    where: CampaignCallWhereUniqueInput
    create: XOR<CampaignCallCreateWithoutCampaignInput, CampaignCallUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignCallCreateManyCampaignInputEnvelope = {
    data: CampaignCallCreateManyCampaignInput | CampaignCallCreateManyCampaignInput[]
  }

  export type CampaignContactCreateWithoutCampaignInput = {
    id?: string
    tenantId: string
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceCall?: CallSessionCreateNestedOneWithoutSourceContactsInput
  }

  export type CampaignContactUncheckedCreateWithoutCampaignInput = {
    id?: string
    tenantId: string
    sourceCallId?: string | null
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignContactCreateOrConnectWithoutCampaignInput = {
    where: CampaignContactWhereUniqueInput
    create: XOR<CampaignContactCreateWithoutCampaignInput, CampaignContactUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignContactCreateManyCampaignInputEnvelope = {
    data: CampaignContactCreateManyCampaignInput | CampaignContactCreateManyCampaignInput[]
  }

  export type TenantUpsertWithoutCampaignsInput = {
    update: XOR<TenantUpdateWithoutCampaignsInput, TenantUncheckedUpdateWithoutCampaignsInput>
    create: XOR<TenantCreateWithoutCampaignsInput, TenantUncheckedCreateWithoutCampaignsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutCampaignsInput, TenantUncheckedUpdateWithoutCampaignsInput>
  }

  export type TenantUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSessions?: CallSessionUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanKeyFieldUpdateOperationsInput | $Enums.PlanKey
    workspaceConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callSessions?: CallSessionUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type CampaignCallUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignCallWhereUniqueInput
    update: XOR<CampaignCallUpdateWithoutCampaignInput, CampaignCallUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignCallCreateWithoutCampaignInput, CampaignCallUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignCallUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignCallWhereUniqueInput
    data: XOR<CampaignCallUpdateWithoutCampaignInput, CampaignCallUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignCallUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignCallScalarWhereInput
    data: XOR<CampaignCallUpdateManyMutationInput, CampaignCallUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignContactUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignContactWhereUniqueInput
    update: XOR<CampaignContactUpdateWithoutCampaignInput, CampaignContactUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignContactCreateWithoutCampaignInput, CampaignContactUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignContactUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignContactWhereUniqueInput
    data: XOR<CampaignContactUpdateWithoutCampaignInput, CampaignContactUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignContactUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignContactScalarWhereInput
    data: XOR<CampaignContactUpdateManyMutationInput, CampaignContactUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignCreateWithoutCallsInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCampaignsInput
    contacts?: CampaignContactCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutCallsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: CampaignContactUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutCallsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutCallsInput, CampaignUncheckedCreateWithoutCallsInput>
  }

  export type CallSessionCreateWithoutCampaignLinksInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCallSessionsInput
    events?: CallEventCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionCreateNestedOneWithoutCallSessionInput
    sourceContacts?: CampaignContactCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionUncheckedCreateWithoutCampaignLinksInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventUncheckedCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput
    sourceContacts?: CampaignContactUncheckedCreateNestedManyWithoutSourceCallInput
  }

  export type CallSessionCreateOrConnectWithoutCampaignLinksInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutCampaignLinksInput, CallSessionUncheckedCreateWithoutCampaignLinksInput>
  }

  export type CampaignUpsertWithoutCallsInput = {
    update: XOR<CampaignUpdateWithoutCallsInput, CampaignUncheckedUpdateWithoutCallsInput>
    create: XOR<CampaignCreateWithoutCallsInput, CampaignUncheckedCreateWithoutCallsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutCallsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutCallsInput, CampaignUncheckedUpdateWithoutCallsInput>
  }

  export type CampaignUpdateWithoutCallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCampaignsNestedInput
    contacts?: CampaignContactUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutCallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: CampaignContactUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CallSessionUpsertWithoutCampaignLinksInput = {
    update: XOR<CallSessionUpdateWithoutCampaignLinksInput, CallSessionUncheckedUpdateWithoutCampaignLinksInput>
    create: XOR<CallSessionCreateWithoutCampaignLinksInput, CallSessionUncheckedCreateWithoutCampaignLinksInput>
    where?: CallSessionWhereInput
  }

  export type CallSessionUpdateToOneWithWhereWithoutCampaignLinksInput = {
    where?: CallSessionWhereInput
    data: XOR<CallSessionUpdateWithoutCampaignLinksInput, CallSessionUncheckedUpdateWithoutCampaignLinksInput>
  }

  export type CallSessionUpdateWithoutCampaignLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCallSessionsNestedInput
    events?: CallEventUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUpdateOneWithoutCallSessionNestedInput
    sourceContacts?: CampaignContactUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateWithoutCampaignLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUncheckedUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput
    sourceContacts?: CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput
  }

  export type CampaignCreateWithoutContactsInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCampaignsInput
    calls?: CampaignCallCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutContactsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CampaignCallUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutContactsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutContactsInput, CampaignUncheckedCreateWithoutContactsInput>
  }

  export type CallSessionCreateWithoutSourceContactsInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCallSessionsInput
    events?: CallEventCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallCreateNestedManyWithoutCallInput
  }

  export type CallSessionUncheckedCreateWithoutSourceContactsInput = {
    id: string
    tenantId: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CallEventUncheckedCreateNestedManyWithoutCallSessionInput
    transcriptSegments?: TranscriptSegmentUncheckedCreateNestedManyWithoutCallSessionInput
    leadExtraction?: LeadExtractionUncheckedCreateNestedOneWithoutCallSessionInput
    campaignLinks?: CampaignCallUncheckedCreateNestedManyWithoutCallInput
  }

  export type CallSessionCreateOrConnectWithoutSourceContactsInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutSourceContactsInput, CallSessionUncheckedCreateWithoutSourceContactsInput>
  }

  export type CampaignUpsertWithoutContactsInput = {
    update: XOR<CampaignUpdateWithoutContactsInput, CampaignUncheckedUpdateWithoutContactsInput>
    create: XOR<CampaignCreateWithoutContactsInput, CampaignUncheckedCreateWithoutContactsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutContactsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutContactsInput, CampaignUncheckedUpdateWithoutContactsInput>
  }

  export type CampaignUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCampaignsNestedInput
    calls?: CampaignCallUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CampaignCallUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CallSessionUpsertWithoutSourceContactsInput = {
    update: XOR<CallSessionUpdateWithoutSourceContactsInput, CallSessionUncheckedUpdateWithoutSourceContactsInput>
    create: XOR<CallSessionCreateWithoutSourceContactsInput, CallSessionUncheckedCreateWithoutSourceContactsInput>
    where?: CallSessionWhereInput
  }

  export type CallSessionUpdateToOneWithWhereWithoutSourceContactsInput = {
    where?: CallSessionWhereInput
    data: XOR<CallSessionUpdateWithoutSourceContactsInput, CallSessionUncheckedUpdateWithoutSourceContactsInput>
  }

  export type CallSessionUpdateWithoutSourceContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCallSessionsNestedInput
    events?: CallEventUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUpdateManyWithoutCallNestedInput
  }

  export type CallSessionUncheckedUpdateWithoutSourceContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUncheckedUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUncheckedUpdateManyWithoutCallNestedInput
  }

  export type CallSessionCreateManyTenantInput = {
    id: string
    roomId: string
    phoneNumber?: string | null
    agentName?: string | null
    direction?: string | null
    status?: $Enums.CallLifecycleStatus
    initiatedAt?: Date | string
    connectedAt?: Date | string | null
    completedAt?: Date | string | null
    failedAt?: Date | string | null
    durationSec?: number | null
    transcriptTurns?: number | null
    recordingUrl?: string | null
    lastError?: string | null
    estimatedCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignCreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CampaignStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallSessionUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CallEventUncheckedUpdateManyWithoutCallSessionNestedInput
    transcriptSegments?: TranscriptSegmentUncheckedUpdateManyWithoutCallSessionNestedInput
    leadExtraction?: LeadExtractionUncheckedUpdateOneWithoutCallSessionNestedInput
    campaignLinks?: CampaignCallUncheckedUpdateManyWithoutCallNestedInput
    sourceContacts?: CampaignContactUncheckedUpdateManyWithoutSourceCallNestedInput
  }

  export type CallSessionUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    agentName?: NullableStringFieldUpdateOperationsInput | string | null
    direction?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCallLifecycleStatusFieldUpdateOperationsInput | $Enums.CallLifecycleStatus
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSec?: NullableFloatFieldUpdateOperationsInput | number | null
    transcriptTurns?: NullableIntFieldUpdateOperationsInput | number | null
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CampaignCallUpdateManyWithoutCampaignNestedInput
    contacts?: CampaignContactUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CampaignCallUncheckedUpdateManyWithoutCampaignNestedInput
    contacts?: CampaignContactUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEventCreateManyCallSessionInput = {
    id?: string
    tenantId: string
    eventType: string
    occurredAt: Date | string
    eventId: string
    payloadJson: string
    rawEnvelope: string
    rawHeaders: string
    createdAt?: Date | string
  }

  export type TranscriptSegmentCreateManyCallSessionInput = {
    id?: string
    tenantId: string
    speaker: $Enums.Speaker
    text: string
    isFinal?: boolean
    sequenceNo: number
    providerMessageId?: string | null
    rawJson?: string | null
    occurredAt: Date | string
    createdAt?: Date | string
  }

  export type CampaignCallCreateManyCallInput = {
    campaignId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type CampaignContactCreateManySourceCallInput = {
    id?: string
    campaignId: string
    tenantId: string
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallEventUpdateWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEventUncheckedUpdateWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEventUncheckedUpdateManyWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
    rawEnvelope?: StringFieldUpdateOperationsInput | string
    rawHeaders?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptSegmentUpdateWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptSegmentUncheckedUpdateWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptSegmentUncheckedUpdateManyWithoutCallSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    speaker?: EnumSpeakerFieldUpdateOperationsInput | $Enums.Speaker
    text?: StringFieldUpdateOperationsInput | string
    isFinal?: BoolFieldUpdateOperationsInput | boolean
    sequenceNo?: IntFieldUpdateOperationsInput | number
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    rawJson?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallUpdateWithoutCallInput = {
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutCallsNestedInput
  }

  export type CampaignCallUncheckedUpdateWithoutCallInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallUncheckedUpdateManyWithoutCallInput = {
    campaignId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactUpdateWithoutSourceCallInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutContactsNestedInput
  }

  export type CampaignContactUncheckedUpdateWithoutSourceCallInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactUncheckedUpdateManyWithoutSourceCallInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallCreateManyCampaignInput = {
    callId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type CampaignContactCreateManyCampaignInput = {
    id?: string
    tenantId: string
    sourceCallId?: string | null
    name?: string | null
    phone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignCallUpdateWithoutCampaignInput = {
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    call?: CallSessionUpdateOneRequiredWithoutCampaignLinksNestedInput
  }

  export type CampaignCallUncheckedUpdateWithoutCampaignInput = {
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCallUncheckedUpdateManyWithoutCampaignInput = {
    callId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceCall?: CallSessionUpdateOneWithoutSourceContactsNestedInput
  }

  export type CampaignContactUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sourceCallId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignContactUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sourceCallId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}