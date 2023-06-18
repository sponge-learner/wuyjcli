import { terser } from 'rollup-plugin-terser';


export default {
    input: "lib/index.js",
    output: {
        file: 'main.js',
    },
    plugins: [
        terser()
    ]
}