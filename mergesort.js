function merge(head, tail) {
    let indexL = 0;
    let indexR = 0;

    let newArr = [];

    while(indexL < head.length && indexR < tail.length) {
        if(head[indexL] < tail[indexR]) {
            newArr.push(head[indexL])
            indexL += 1;
        } else {
            newArr.push(tail[indexR])
            indexR += 1;
        }
    }
    newArr.push(...head.slice(indexL))
    newArr.push(...tail.slice(indexR))
    //console.log(newArr)
    return newArr
}

export default function mergeSort(arr) {
    if(arr.length === 1){
        return arr
    }

    // pretty clever way of getting rid of the duplicates
    arr = [...new Set(arr)]

    const h = Math.floor(arr.length/2);
    const head = mergeSort(arr.slice(0, h));
    const tail = mergeSort(arr.slice(h));

    return merge(head, tail)
}