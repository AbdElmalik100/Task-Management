// Generating a random number for task ID
export const generateRandomNumber = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const randomNumber = []
    for (let counter = 0; counter < 5; counter++) {
        const random = Math.floor(numbers.length * Math.random())
        randomNumber.push(numbers[random])
    }
    return randomNumber.join("")
}