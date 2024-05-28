import { Chain } from "./chain";

describe('chain함수체크',()=>{
    let node = new Chain()
    /*
    it('getChain() 함수체크',()=>{
        console.log(node.getChain())
    })
    it('getLength() 함수체크',()=>{
        console.log(node.getLength())
    })
    it('getLastBlock() 함수체크',()=>{
        console.log(node.getLastBlock())
    })*/
     it('addBLock() 함수체크',()=>{
        for(let i = 1; i <= 300; i++){
            node.addBlock([`Block#${i}`])
        }
        
        console.log(node.getChain());
    })

})