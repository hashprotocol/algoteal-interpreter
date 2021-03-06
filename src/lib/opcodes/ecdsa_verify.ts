import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { ec as EC } from "elliptic";

export class Ecdsa_verify extends Opcode {
    
    //
    // The curve index parsed from first operand.
    ///
    private curveIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.curveIndex = Number(this.parseIntOperand(0));
    }
    
    execute(context: IExecutionContext): void {
        const pubkey2 = context.stack.pop()?.value as Uint8Array;
        const pubkey1 = context.stack.pop()?.value as Uint8Array;
        const signature2 = context.stack.pop()?.value as Uint8Array;
        const signature1 = context.stack.pop()?.value as Uint8Array;
        const data = context.stack.pop()?.value as Uint8Array;

        const ec = new EC('secp256k1');
        const key = ec.keyFromPublic({ 
            x: Buffer.from(pubkey1).toString('hex'), 
            y: Buffer.from(pubkey2).toString('hex') 
        });
        if (key.verify(data, { r: signature1, s: signature2 })) {
            this.pushInt(context, BigInt(1));
        } 
        else {
            this.pushInt(context, BigInt(0));
        }
    }
}
