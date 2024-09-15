let i = 0
while (true) {
    process.stdout.write("USER: " + `${i}%`);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    i++
}