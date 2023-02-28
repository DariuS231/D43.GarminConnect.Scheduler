export const getDateFormat = (dt: Date): string =>{
    return `${dt.getFullYear()}-${(dt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dt.getDate().toString().padStart(2, "0")}`
}
