import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Arg extends Opcode {

    //
    // The parsed index operand.
    //
    private argIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.argIndex = this.parseIntOperand(0);
    }
    
    execute(context: IExecutionContext): void {
        if (this.argIndex < 0 || this.argIndex >= context.args.length) {
            throw new Error(`Invalid index "${this.argIndex}" provided to "arg" opcode. It is outside the range of ${context.args.length} arguments.`);
        }

        context.stack.push(context.args[this.argIndex]);
    }
}
