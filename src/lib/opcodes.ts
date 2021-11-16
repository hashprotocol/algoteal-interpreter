import { IToken } from "./token";
import { Add } from "./opcodes/add";
import { Int } from "./opcodes/int";
import { Pop } from "./opcodes/pop";
import { IOpcode } from "./opcode";
import { VersionPragma } from "./opcodes/version-pragma";
import { Branch } from "./opcodes/branch";
import { Err } from "./opcodes/Err";
import { Sha256 } from "./opcodes/sha256";
import { Arg } from "./opcodes/Arg";
import { Txn } from "./opcodes/txn";
import { Global } from "./opcodes/global";
import { Load } from "./opcodes/load";
import { Store } from "./opcodes/store";
import { Len } from "./opcodes/len";
import { Gtxn } from "./opcodes/gtxn";
import { Keccak256 } from "./opcodes/keccak256";
import { Sha512_256 } from "./opcodes/sha512_256";
import { Ed25519verify } from "./opcodes/ed25519verify";
import { Byte } from "./opcodes/byte";
import { Addr } from "./opcodes/addr";
import { Ecdsa_verify } from "./opcodes/ecdsa_verify";
import { Minus } from "./opcodes/minus";
import { Div } from "./opcodes/div";
import { Mul } from "./opcodes/mul";
import { Lt } from "./opcodes/lt";
import { Gt } from "./opcodes/gt";
import { Lte } from "./opcodes/lte";
import { Gte } from "./opcodes/gte";
import { And } from "./opcodes/and";
import { Or } from "./opcodes/or";
import { Eq } from "./opcodes/eq";
import { Ne } from "./opcodes/ne";
import { Not } from "./opcodes/not";
import { Itob } from "./opcodes/itob";
import { Btoi } from "./opcodes/btoi";
import { Mod } from "./opcodes/mod";
import { Bor } from "./opcodes/bor";
import { Band } from "./opcodes/band";
import { Xor } from "./opcodes/xor";
import { Complement } from "./opcodes/complement";
import { Mulw } from "./opcodes/mulw";
import { Intcblock } from "./opcodes/intcblock";
import { Intc } from "./opcodes/intc";
import { Intc_X } from "./opcodes/intc_X";
import { Bytecblock } from "./opcodes/bytecblock";
import { Bytec } from "./opcodes/bytec";
import { Bytec_X } from "./opcodes/bytec_X";
import { Arg_X } from "./opcodes/arg_X";
import { Bnz } from "./opcodes/bnz";
import { Dup } from "./opcodes/dup";
import { Assert } from "./opcodes/assert";
import { Sqrt } from "./opcodes/sqrt";
import { Addw } from "./opcodes/addw";
import { Txna } from "./opcodes/txna";
import { Gtxna } from "./opcodes/gtxna";
import { Bz } from "./opcodes/bz";
import { Return } from "./opcodes/return";
import { Dup2 } from "./opcodes/dup2";
import { Concat } from "./opcodes/concat";
import { Substring } from "./opcodes/substring";
import { Substring3 } from "./opcodes/substring3";
import { Balance } from "./opcodes/balance";
import { AppLocalGet } from "./opcodes/app_local_get";
import { AppLocalPut } from "./opcodes/app_local_put";
import { AppGlobalGet } from "./opcodes/app_global_get";
import { AppGlobalPut } from "./opcodes/app_global_put";
import { AppLocalDel } from "./opcodes/app_local_del";
import { AppGlobalDel } from "./opcodes/app_global_del";
import { AppOptedIn } from "./opcodes/app_opted_in";
import { AppLocalGetEx } from "./opcodes/app_local_get_ex";
import { AppGlobalGetEx } from "./opcodes/app_global_get_ex";
import { AssetHoldingGet } from "./opcodes/asset_holding_get";
import { AssetParamsGet } from "./opcodes/asset_params_get";
import { MinBalance } from "./opcodes/min_balance";

//
// The static definiton of an opcode.
//
export interface IOpcodeDef {
    //
    // The version of TEAL that adds the opcode.
    //
    readonly version: number;

    //
    // The cost of the instruction (at various levels of TEAL versions).
    //
    readonly cost?: number | number[];

    //
    // The number of operands expected by the opcode.
    //
    readonly operands: number | number[] | undefined;

    //
    // The number of stack based arguments expected by this opcode.
    //
    readonly stack: number | undefined;

    //
    // Factory function to create an instance of the opcode.
    //
    readonly factory: (token: IToken) => IOpcode,
}

//
// A look up table for opcode handlers.
//
export interface IOpcodeMap {
    [index: string]: IOpcodeDef;
}

//
// A look up table for opcode constructors.
//
export const opcodeDefs: IOpcodeMap = {
    
    // TEAL 1
    "#pragma": {
        version: 1,
        operands: 2,
        stack: undefined,
        factory: function (token) { return new VersionPragma(token, this) },
    },
    "err":  {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Err(token, this) },
    },
    "sha256":  {
        version: 1,
        cost: [7, 35],
        operands: 0,
        stack: 1,
        factory: function (token) { return new Sha256(token, this) },
    },
    "keccak256":  {
        version: 1,
        cost: [26, 130],
        operands: 0,
        stack: 1,
        factory: function (token) { return new Keccak256(token, this) },
    },
    "sha512_256":  {
        version: 1,
        cost: [9, 45],
        operands: 0,
        stack: 1,
        factory: function (token) { return new Sha512_256(token, this) },
    },
    "ed25519verify":  {
        version: 1,
        cost: 1900,
        operands: 0,
        stack: 3,
        factory: function (token) { return new Ed25519verify(token, this) },
    },
    "+": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Add(token, this) },
    },
    "-": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Minus(token, this) },
    },
    "/": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Div(token, this) },
    },
    "*": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Mul(token, this) },
    },    
    "<": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Lt(token, this) },
    },    
    ">": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Gt(token, this) },
    },    
    "<=": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Lte(token, this) },
    },    
    ">=": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Gte(token, this) },
    },    
    "&&": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new And(token, this) },
    },    
    "||": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Or(token, this) },
    },    
    "==": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Eq(token, this) },
    },    
    "!=": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Ne(token, this) },
    },    
    "!": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Not(token, this) },
    },    
    "len": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Len(token, this) },
    },
    "itob": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Itob(token, this) },
    },   
    "btoi": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Btoi(token, this) },
    },        
    "%": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Mod(token, this) },
    },        
    "|": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Bor(token, this) },
    },      
    "&": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Band(token, this) },
    },    
    "^": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Xor(token, this) },
    },    
    "~": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Complement(token, this) },
    },              
    "mulw": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Mulw(token, this) },
    },              
    "intcblock": {
        version: 1,
        operands: undefined,
        stack: 0,
        factory: function (token) { return new Intcblock(token, this) },
    },              
    "intc": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Intc(token, this) },
    },              
    "intc_0": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 0) },
    },              
    "intc_1": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 1) },
    },              
    "intc_2": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 2) },
    },              
    "intc_3": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 3) },
    },              
    "bytecblock": {
        version: 1,
        operands: undefined,
        stack: 0,
        factory: function (token) { return new Bytecblock(token, this) },
    },              
    "bytec": {
        operands: 1,
        stack: 0,
        version: 1,
        factory: function (token) { return new Bytec(token, this) },
    },              
    "bytec_0": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 0) },
    },              
    "bytec_1": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 1) },
    },              
    "bytec_2": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 2) },
    },              
    "bytec_3": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 3) },
    },              
    "arg": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Arg(token, this) },
    },
    "arg_0": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 0) },
    },
    "arg_1": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 1) },
    },
    "arg_2": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 2) },
    },
    "arg_3": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 3) },
    },
    "txn": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Txn(token, this) },
    },
    "global": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Global(token, this) },
    },
    "gtxn": {
        version: 1,
        operands: 2,
        stack: 0,
        factory: function (token) { return new Gtxn(token, this) },
    },
    "load": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Load(token, this) },
    },
    "store": {
        version: 1,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Store(token, this) },
    },
    "bnz": {
        version: 1,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Bnz(token, this) },
    },
    "pop": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Pop(token, this) },
    },
    "dup": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Dup(token, this) },
    },

    // Pseudo opcodes
    "int":  {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Int(token, this) },
    },
    "byte":  {
        version: 1,
        operands: [1, 2],
        stack: 0,
        factory: function (token) { return new Byte(token, this) },
    },
    "addr":  {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Addr(token, this) },
    },
    
    // TEAL 2
    "addw": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Addw(token, this) },
    },
    "txna": {
        version: 2,
        operands: 2,
        stack: 0,
        factory: function (token) { return new Txna(token, this) },
    },
    "gtxna": {
        version: 2,
        operands: 3,
        stack: 0,
        factory: function (token) { return new Gtxna(token, this) },
    },
    "bz": {
        version: 2,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Bz(token, this) },
    },
    "b": {
        version: 2,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Branch(token, this) },
    },
    "return": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Return(token, this) },
    },
    "dup2": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Dup2(token, this) },
    },
    "concat": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Concat(token, this) },
    },
    "substring": {
        version: 2,
        operands: 2,
        stack: 1,
        factory: function (token) { return new Substring(token, this) },
    },
    "substring3": {
        version: 2,
        operands: 0,
        stack: 3,
        factory: function (token) { return new Substring3(token, this) },
    },
    "balance": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Balance(token, this) },
    },
    "app_opted_in": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppOptedIn(token, this) },
    },
    "app_local_get": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppLocalGet(token, this) },
    },
    "app_local_get_ex": {
        version: 2,
        operands: 0,
        stack: 3,
        factory: function (token) { return new AppLocalGetEx(token, this) },
    },
    "app_global_get": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new AppGlobalGet(token, this) },
    },
    "app_global_get_ex": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppGlobalGetEx(token, this) },
    },
    "app_local_put": {
        version: 2,
        operands: 0,
        stack: 3,
        factory: function (token) { return new AppLocalPut(token, this) },
    },
    "app_global_put": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppGlobalPut(token, this) },
    },
    "app_local_del": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppLocalDel(token, this) },
    },
    "app_global_del": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new AppGlobalDel(token, this) },
    },
    "asset_holding_get": {
        version: 2,
        operands: 1,
        stack: 2,
        factory: function (token) { return new AssetHoldingGet(token, this) },
    },
    "asset_params_get": {
        version: 2,
        operands: 1,
        stack: 1,
        factory: function (token) { return new AssetParamsGet(token, this) },
    },

    // TEAL 3
    "min_balance": {
        version: 3,
        operands: 0,
        stack: 1,
        factory: function (token) { return new MinBalance(token, this) },
    },

    "assert": {
        version: 3,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Assert(token, this) },
    },

    // TEAL 4

    "sqrt": {
        version: 4,
        cost: 4,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Sqrt(token, this) },
    },

    // TEAL 5
    "ecdsa_verify":  {
        version: 5,
        cost: 1700,
        operands: 1,
        stack: 5,
        factory: function (token) { return new Ecdsa_verify(token, this) },
    },
};