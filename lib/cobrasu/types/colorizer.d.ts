export declare class Colorizer {
    /**
     * Converts a color value from one CSS format to another
     * @param value Color value in original format
     * @param from Original format
     * @param to Target format
     * @returns Color value in target format
     */
    static convert(value: string, from: Colorizer.Format, to: Colorizer.Format): string;
    static wheel(count: number, format?: Colorizer.Format): IterableIterator<string>;
}
export declare namespace Colorizer {
    type Format = "hex" | "hsl" | "rgb";
}
export default Colorizer;
