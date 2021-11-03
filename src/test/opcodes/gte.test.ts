import { Gte } from "../../lib/opcodes/gte";

describe("gte opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: ">=",
            operands: [],            
        };
        const context: any = {
            stack: [
                BigInt(2),
                BigInt(10), 
            ],
        };
        const opcode = new Gte(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(0);
    });
});