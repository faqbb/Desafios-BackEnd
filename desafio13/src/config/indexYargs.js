import yargs from "yargs";

 const yargInstance = yargs(process.argv.slice(2)).default({
    p: 8080,
    m: FORK
    }).alias({
        p: "PORT",
        m: "MODE"
    })

const {
    PORT,
    MODE,
    _
} = yargInstance.argv


 const config = {
    port: PORT,
    mode: MODE,
    others: _
}

export default config