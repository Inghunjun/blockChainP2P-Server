import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { IBlock } from 'src/blockTypes/block';
import { Block } from 'src/core/blockChain/block';
import { Chain } from 'src/core/blockChain/chain';
import { MessageDto } from './dto/message.dto';
import { Server } from 'socket.io';

enum MessageType{
  lastBlock = 1,
  allBlock = 2,
  receivedChain = 3,
}

@WebSocketGateway(4000,{transports : ['websocket'],namespace : "user"})
export class P2pGateway extends Chain implements OnGatewayConnection{
  
  @WebSocketServer()
  server : Server

  private sockets: any[]

  constructor(){
    super(),
    this.sockets = []
  }

  handleConnection(client: any, ...args: any[]) {
    this.sockets.push(client)
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client : Server,@MessageBody() payload : MessageDto){
    if(!payload.type){
      return {error : true}
    } 

    switch(payload.type){
      case MessageType.lastBlock: {//마지막 블럭을 반환하는코드
        console.log()
        const message = {
          type : MessageType.allBlock,
          payload : [this.getChain()]
        }
        client.emit("message",message)
        break;
      }
      case MessageType.allBlock : {//블럭추가
        const message = {
          type : MessageType.receivedChain,
          payload : this.getChain()
        }
        const [receivedBlock]  = payload.payload
        const receivedBlockValid = this.addTochain(receivedBlock)

          if(receivedBlockValid.error){
            client.emit("message",message)
            break
          }
          this.brodcast(message)
          break;
      }
      case MessageType.receivedChain : {//체인교체하기
        const newChain = payload.payload//교체될체인
        const validChain = this.handelChainResponse(newChain)//유효한체인인지 검증후에 체인교체
        break
      }
      default : {
      }
    }
  }

  handelChainResponse(receiveChain : Block[]){
    const isValidChain = this.isValidChain(receiveChain)//유효한체인인지검증
    if(isValidChain.error){
      return isValidChain
    }
    //체인교체코드
    const valid = this.replaceChain(receiveChain)
    if(valid.error){
      return valid
    }
    const message = {
      type : MessageType.receivedChain,
      payload : receiveChain
    }
    this.brodcast(message)
  }

  brodcast(message : MessageDto){
    this.server.emit("message",message)
  }
  
}