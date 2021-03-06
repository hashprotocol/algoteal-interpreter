import { opcodeDefs } from "../../lib/opcodes";
import { Bytec_X } from "../../lib/opcodes/bytec_X";

describe("bytec_X opcode", () => {

    it ("can execute with index 0", () => {

        const token: any = {};
        const opcode = new Bytec_X(token, opcodeDefs.bytec_0, 0);

        const context: any = {
            stack: [],
            bytecblock: [
                new Uint8Array([1, 2]),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([1, 2]);
    });

    it ("can execute with index 2", () => {

        const token: any = {};
        const opcode = new Bytec_X(token, opcodeDefs.bytec_2, 2);

        const context: any = {
            stack: [],
            bytecblock: [
                new Uint8Array([1, 2]),
                new Uint8Array([3, 4]),
                new Uint8Array([5, 6]),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([5, 6]);
    });

});