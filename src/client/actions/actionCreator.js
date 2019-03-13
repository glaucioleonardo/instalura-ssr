export function listagem(fotos){
    return {type:'LISTAGEM',fotos};
}
export function comentario(fotoId,novoComentario){
    return {type:'COMENTARIO',fotoId,novoComentario}    
}
export function like(fotoId,liker){
    return {type:'LIKE',fotoId,liker};    
}
export function notifica(msg){
    return {type:'ALERT',msg};
}
export function apaga(msg){
    return {type:'APAGA', msg};
}

                
export function validateLoginAction(result, remove) {
    return {type: 'VALIDATE-LOGIN', result, remove}
}
export function validatePasswordAction(result, remove) {
    return {type: 'VALIDATE-PASSWORD', result, remove}
}
export function validateProfileAction(result, remove) {
    return {type: 'VALIDATE-PROFILE', result, remove}
}