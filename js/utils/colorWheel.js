/**
 * Converts a color value from one format to another
 * @param value Color value in original format
 * @param from Original format
 * @param to Target format
 * @returns Color value in target format
 */
function convert(value, from, to) {
    let r, g, b, a;
    switch (from) {
        case "hex":
            break;
        case "hsl":
            break;
        case "rgb":
            break;
        default:
            throw new Error(`Invalid color format '${from}'`);
    }
    switch (to) {
        case "hex":
            return null;
        case "hsl":
            return null;
        case "rgb":
            return null;
        default:
            throw new Error(`Invalid color format '${to}'`);
    }
}
export default function* colorWheel(count) {
    count = Math.max(1, count);
    for (let i = 0; i < count; i++) {
        let color = `hsl(${i * (360 / count) % 360}, 100%, 50%)`;
        yield convert(color, "hsl", "hex");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JXaGVlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb2xvcldoZWVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7R0FNRztBQUNILFNBQVMsT0FBTyxDQUFDLEtBQWEsRUFBRSxJQUFpQixFQUFFLEVBQWU7SUFDakUsSUFBSSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLENBQUE7SUFFOUMsUUFBTyxJQUFJLEVBQUU7UUFDWixLQUFLLEtBQUs7WUFDVCxNQUFLO1FBQ04sS0FBSyxLQUFLO1lBQ1QsTUFBSztRQUNOLEtBQUssS0FBSztZQUNULE1BQUs7UUFDTjtZQUNDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLElBQUksR0FBRyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxRQUFPLEVBQUUsRUFBRTtRQUNWLEtBQUssS0FBSztZQUNULE9BQU8sSUFBSSxDQUFBO1FBQ1osS0FBSyxLQUFLO1lBQ1QsT0FBTyxJQUFJLENBQUE7UUFDWixLQUFLLEtBQUs7WUFDVCxPQUFPLElBQUksQ0FBQTtRQUNaO1lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUNoRDtBQUNGLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBYTtJQUNoRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFMUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQTtRQUN4RCxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0tBQ2xDO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbInR5cGUgQ29sb3JGb3JtYXQgPSBcImhleFwiIHwgXCJoc2xcIiB8IFwicmdiXCJcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGNvbG9yIHZhbHVlIGZyb20gb25lIGZvcm1hdCB0byBhbm90aGVyXG4gKiBAcGFyYW0gdmFsdWUgQ29sb3IgdmFsdWUgaW4gb3JpZ2luYWwgZm9ybWF0XG4gKiBAcGFyYW0gZnJvbSBPcmlnaW5hbCBmb3JtYXRcbiAqIEBwYXJhbSB0byBUYXJnZXQgZm9ybWF0XG4gKiBAcmV0dXJucyBDb2xvciB2YWx1ZSBpbiB0YXJnZXQgZm9ybWF0XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnQodmFsdWU6IHN0cmluZywgZnJvbTogQ29sb3JGb3JtYXQsIHRvOiBDb2xvckZvcm1hdCk6IHN0cmluZyB7XG5cdGxldCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXJcblxuXHRzd2l0Y2goZnJvbSkge1xuXHRcdGNhc2UgXCJoZXhcIjpcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSBcImhzbFwiOlxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIFwicmdiXCI6XG5cdFx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29sb3IgZm9ybWF0ICcke2Zyb219J2ApXG5cdH1cblxuXHRzd2l0Y2godG8pIHtcblx0XHRjYXNlIFwiaGV4XCI6XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGNhc2UgXCJoc2xcIjpcblx0XHRcdHJldHVybiBudWxsXG5cdFx0Y2FzZSBcInJnYlwiOlxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbG9yIGZvcm1hdCAnJHt0b30nYClcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogY29sb3JXaGVlbChjb3VudDogbnVtYmVyKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcblx0Y291bnQgPSBNYXRoLm1heCgxLCBjb3VudClcblxuXHRmb3IobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdGxldCBjb2xvciA9IGBoc2woJHtpICogKDM2MCAvIGNvdW50KSAlIDM2MH0sIDEwMCUsIDUwJSlgXG5cdFx0eWllbGQgY29udmVydChjb2xvciwgXCJoc2xcIiwgXCJoZXhcIilcblx0fVxufSJdfQ==