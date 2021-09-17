const path = require('path')
const splitFile = require('split-file')
const prompts = require('prompts')


let defaultFileSize = 10 * 1024 * 1024 // 10Mb
let defaultFileName = 'service.out.log'

const getFileSize = async () => {
    const fileSize = await prompts({
        type: 'number',
        name: 'value',
        message: 'Enter file size in Mb (by default: 10 Mb)',
        validate: value => value < 0 ? 'File size must be greater then 0!' : true
    })  
    return fileSize.value
}

const getFileName = async () => {
    const fileName = await prompts({
        type: 'text',
        name: 'value',
        message: 'Enter file name (by default: "service.out.log")'       
    })   
    return fileName.value
}

(async () => {
    try {
        const fileName = await getFileName()
        const fileSize = await getFileSize() * 1024 * 1024 || defaultFileSize 
        let filePath
        //fileName ? filePath = __dirname + `/${fileName}` : filePath = __dirname + '/' + defaultFileName      
        fileName ? filePath = `${process.cwd()}/${fileName}` : filePath = `${process.cwd()}/${defaultFileName}`

        console.log('File path: ', filePath)
        console.log('File size: ', fileSize)
        
        const fileNames = await splitFile.splitFileBySize(filePath, fileSize)
        console.log(fileNames)

        console.log('Spliting was successful. App will be terminted in 10 seconds')
        await sleep(10000)
    } catch(err){
        console.log('Error: ' + err)
        await sleep(10000)
    }
})()

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)       
    })
}
