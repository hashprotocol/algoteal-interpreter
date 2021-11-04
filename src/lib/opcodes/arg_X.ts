import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Arg_X extends Opcode {

    constructor(token: IToken, private constantIndex: number) {
        super(token, 0, 0);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(context.args[this.constantIndex]);
    }
}