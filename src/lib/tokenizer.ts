
import { IToken } from "./token";

//
// Tokenizes TEAL code and returns an intermediate format.
//
export function tokenize(tealCode: string): IToken[] {

    return tealCode.split("\n") // Split line-by-line.

        // Remove whitespace.
        .map(line => line.trim()) 

        // Capture line numbers.
        .map((line, index) => ({ content: line, lineNo: index+1 })) 

        // Filter blank lines.
        .filter(line => line.content.length > 0)              

        // Parse tokens.
        .map(line => parseLine(line.content, line.lineNo))

        // Filter blank lines (after comment removed). Casting to remove 'undefined' which has been filtered out.
        .filter(line => line) as IToken[] 
}

//
// Parses a line of TEAL code.
//
function parseLine(line: string, lineNo: number): IToken | undefined  {

    const commentStartIndex = line.indexOf("//");
    if (commentStartIndex !== -1) {
        // Remove the comment (leaving the first part of the line intact).
        line = line.substring(0, commentStartIndex).trim();

        if (line.length === 0) {
            return undefined; // Nothing else on the line.
        }
    }

    if (!line.startsWith("#pragma")) {
        const commentStartIndex = line.indexOf("#");
        if (commentStartIndex !== -1) {
            // Remove the comment (leaving the first part of the line intact).
            line = line.substring(0, commentStartIndex).trim();

            if (line.length === 0) {
                return undefined; // Nothing else on the line.
            }
        }
    }

    const parts = line.split(" ")
        .filter(part => part.length > 0);
    const opcode = parts.shift()!;
    const token: IToken = {
        lineNo: lineNo,
        opcode: opcode,
        operands: parts,
    };         
    return token;
}
