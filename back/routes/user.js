var express = require('express');
var axios = require('axios');
const router = express.Router();
const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
const KAKAO_GRANT_TYPE="authorization_code"
const KAKAO_CLIENT_id="58acce2e1c5607a9310ef74870273737"
const KAKAO_REDIRECT_URL="http://localhost:3000/auth/kakao/callback"

router.get('/kakao/code', function (req, res, next) {
        let code = req.query.code;
        try{
            axios.post(
                `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_id}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`
                , {
                 headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((result)=>{
                console.log(result.data['access_token'])
                // 토큰을 활용한 로직을 적어주면된다.
                res.json(result.data);
            }).catch(e=> {
                console.log(e)
                res.send(e);
            })
        }catch(e){
            console.log(e)
            res.send(e);
        }
})
module.exports = router;