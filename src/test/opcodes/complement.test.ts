import { Complement } from "../../lib/opcodes/complement";

describe("complement opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "~",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(3) 
            ],
        };
        const opcode = new Complement(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(-4); 
    });
});