export function modifyLines(part: string){

    const isBoldItalicUnderlineTrue = /(?<=[*~_]{3}).*(?=[*~_]{3})/gm.test(part)
    const isBoldItalicTrue = /(?<=[*_]{2}).*(?=[*_]{2})/gm.test(part)
    const isUnderlineItalicTrue = /(?<=[*~]{2}).*(?=[*~]{2})/gm.test(part)
    const isUnderlineBoldTrue = /(?<=[_~]{2}).*(?=[_~]{2})/gm.test(part)

    const bold = part.startsWith('_') && part.endsWith('_')
    const italic = /(?<=[*]{1}).*(?=[*]{1})/gm.test(part)
    const underline = part.startsWith('~') && part.endsWith('~')

    const modifiers = {
        isBoldItalicUnderlineTrue,
        isBoldItalicTrue,
        isUnderlineItalicTrue,
        isUnderlineBoldTrue,
        bold,
        italic,
        underline
    }
    return modifiers
}