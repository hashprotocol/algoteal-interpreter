import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class PushInt extends Opcode {
   
    //
    // The integer literal value parsed from operands.
    //
    private value!: bigint;

    validateOperand(): void {
        super.validateOperand();

        this.value = this.parseBigIntOperand(0);
    }

    execute(context: IExecutionContext): void {
        this.pushInt(context, this.value);
    }
}
