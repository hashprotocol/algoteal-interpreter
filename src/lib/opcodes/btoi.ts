import { decodeUint64 } from "algosdk";
import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";

export class Btoi extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = this.popBytes(context);
        if (value.length > 8) {
            throw new Error(`Input byte array is too long at ${value.length}, expected length is between 0 and 8.`);
        }
        else if (value.length === 0) {
            this.pushInt(context, BigInt(0));
        }
        else {
            this.pushInt(context, decodeUint64(value, "bigint"));
        }
    }
}
