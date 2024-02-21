import{_ as I,n as E,u as k,g as _,h as L,T as y,A as S,c as n,a as e,i as f,v as h,F as u,j as b,t as m,b as B,w as F,r as T,o as r,p as C,f as P}from"./index-J1NdgNPM.js";const i=c=>(C("data-v-0b5ca543"),c=c(),P(),c),R={class:"register w-100 d-flex align-items-center justify-content-center bg-light"},V={class:"container"},j={class:"row w-100 justify-content-center"},A={class:"col-lg-6"},N={class:"card border-0 shadow p-2 p-sm-5 rounded-4"},U={class:"card-body"},$=i(()=>e("div",{class:"text-center mb-4"},[e("h2",{class:"fst-italic font-bold text-primary mb-2"},"Ecomfulfil."),e("h4",null,"Create your account.")],-1)),D={class:"w-100 mb-3"},M=i(()=>e("label",{for:"name",class:"form-label"},"Full name",-1)),O={class:"w-100 mb-3"},J=i(()=>e("label",{for:"email",class:"form-label"},"Email Address",-1)),W={class:"w-100 mb-4"},q=i(()=>e("label",{for:"password",class:"form-label"},"Password",-1)),z={class:"text-center mb-2"},G=["disabled"],H={class:"text-center"},K=i(()=>e("small",null,"Already have an account? Log In",-1)),Q=i(()=>e("div",{class:"error_toast position-fixed"},[e("div",{id:"errorToast",class:"toast align-items-center text-bg-danger border-0",role:"alert","aria-live":"assertive","aria-atomic":"true"},[e("div",{class:"d-flex"},[e("div",{class:"toast-body"}," Something went wrong, please try again. "),e("button",{type:"button",class:"btn-close btn-close-white me-2 m-auto","data-bs-dismiss":"toast","aria-label":"Close"})])])],-1)),X={__name:"Register",setup(c){const g=E(),p=k(),o=_({name:"",email:"",password:""}),l=_(!1),d=_({name:"",email:"",password:""});L(()=>{p.state.isLoggedIn&&g.push("/generate-label"),window.addEventListener("keydown",a=>{a.key==="Enter"&&w()})});const w=()=>{l.value=!0;try{S.post("register",o.value).then(a=>{if(a.data.error){d.value=a.data.validation_message;let s=Object.keys(a.data.validation_message);s.forEach(v=>{let t=document.getElementById(v);t.classList.add("is-invalid"),document.getElementById(s[0]).focus(),t.addEventListener("input",()=>{t.value.trim()!==""?t.classList.remove("is-invalid"):t.classList.add("is-invalid")})}),l.value=!1;return}else{l.value=!1,p.state.user=a.data.user,p.state.isLoggedIn=!0;const s=JSON.stringify(a.data.user);localStorage.setItem("user",s),x(),g.push("/generate-label")}}).catch(()=>{l.value=!1,new y(document.getElementById("errorToast")).show()})}catch{console.error("Internal Server Error"),l.value=!1,new y(document.getElementById("errorToast")).show()}},x=()=>{o.value={name:"",email:"",password:""},d.value={name:"",email:"",password:""}};return(a,s)=>{const v=T("router-link");return r(),n(u,null,[e("section",R,[e("div",V,[e("div",j,[e("div",A,[e("div",N,[e("div",U,[$,e("div",D,[M,f(e("input",{type:"text",class:"form-control",id:"name",placeholder:"Please enter your full name","onUpdate:modelValue":s[0]||(s[0]=t=>o.value.name=t)},null,512),[[h,o.value.name]]),(r(!0),n(u,null,b(d.value.name,t=>(r(),n("small",{class:"text-danger",key:`${t}-name`},m(t),1))),128))]),e("div",O,[J,f(e("input",{type:"email",class:"form-control",id:"email",placeholder:"Please enter your email","onUpdate:modelValue":s[1]||(s[1]=t=>o.value.email=t)},null,512),[[h,o.value.email]]),(r(!0),n(u,null,b(d.value.email,t=>(r(),n("small",{class:"text-danger",key:`${t}-email`},m(t),1))),128))]),e("div",W,[q,f(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Please enter your password","onUpdate:modelValue":s[2]||(s[2]=t=>o.value.password=t)},null,512),[[h,o.value.password]]),(r(!0),n(u,null,b(d.value.password,t=>(r(),n("small",{class:"text-danger",key:`${t}-password`},m(t),1))),128))]),e("div",z,[e("button",{class:"btn btn-primary font-bold text-white px-5",disabled:l.value,onClick:w},m(l.value?"Please Wait":"Register"),9,G)]),e("div",H,[B(v,{to:"/login",class:"text-secondary"},{default:F(()=>[K]),_:1})])])])])])])]),Q],64)}}},ee=I(X,[["__scopeId","data-v-0b5ca543"]]);export{ee as default};
