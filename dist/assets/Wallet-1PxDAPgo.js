import{_ as x,m as I,r as d,l as B,T as f,A as h,c as m,a as e,t as p,w as T,v as E,F as k,b as S,u as F,o as _,p as P,k as A,f as $}from"./index-Xlc_CpZz.js";const s=i=>(P("data-v-c4b3f5af"),i=i(),A(),i),L={class:"wallet py-5 bg-light"},N={class:"container"},W={class:"row justify-content-center"},C={class:"col-md-10"},U={class:"card mb-4"},V={class:"card-body"},j=s(()=>e("div",{class:"d-flex align-items-center mb-3"},[e("i",{class:"bi bi-wallet fs-2 me-2"}),e("h2",{class:"font-medium mb-0"},"Wallet")],-1)),q={class:"fs-4 mb-0"},z={class:"card"},D={class:"card-body"},M=s(()=>e("h2",{class:"font-medium mb-3 fs-4"},"Topup Balance",-1)),O={class:"row mb-4"},R={class:"col-lg-6 col-md-10"},G=s(()=>e("label",{for:"amount",class:"form-label"},[$("Topup Amount "),e("span",null,"($)")],-1)),H={class:"input-group"},J=s(()=>e("span",{class:"input-group-text"},"$",-1)),K=s(()=>e("span",{class:"input-group-text"},".00",-1)),Q={class:"text-center"},X=["disabled"],Y=s(()=>e("div",{class:"payment_toast position-fixed"},[e("div",{id:"successPayment",class:"toast align-items-center text-bg-success border-0",role:"alert","aria-live":"assertive","aria-atomic":"true"},[e("div",{class:"d-flex"},[e("div",{class:"toast-body"}," Payment Successful. "),e("button",{type:"button",class:"btn-close btn-close-white me-2 m-auto","data-bs-dismiss":"toast","aria-label":"Close"})])])],-1)),Z=s(()=>e("div",{class:"payment_toast position-fixed"},[e("div",{id:"paymentError",class:"toast align-items-center text-bg-danger border-0",role:"alert","aria-live":"assertive","aria-atomic":"true"},[e("div",{class:"d-flex"},[e("div",{class:"toast-body"}," Payment Failed! Please try again. "),e("button",{type:"button",class:"btn-close btn-close-white me-2 m-auto","data-bs-dismiss":"toast","aria-label":"Close"})])])],-1)),ee={__name:"Wallet",setup(i){const v=I(),r=F(),l=d({userId:r.state.user.id,amount:""}),u=d({amount:""}),b=d(0),a=d(!1);B(()=>{g(),v.query.payment==="success"&&new f(document.getElementById("successPayment")).show(),v.query.payment==="failed"&&new f(document.getElementById("paymentError")).show()});const y=async()=>{try{a.value=!0,await h.post("create-checkout-session",l.value,{headers:{Authorization:`Bearer ${r.state.user.accessToken}`}}).then(t=>{if(t.data.error){u.value=t.data.validation_message;let n=Object.keys(t.data.validation_message);n.forEach(o=>{let c=document.getElementById(o);c.classList.add("is-invalid"),document.getElementById(n[0]).focus(),c.addEventListener("input",()=>{c.value.trim()!==""?c.classList.remove("is-invalid"):c.classList.add("is-invalid")})}),a.value=!1;return}else window.location=t.data.url,a.value=!1,w()})}catch(t){console.log("Internal Server Error",t),a.value=!1}},g=async()=>{try{await h.post("get-balance",{userId:l.value.userId},{headers:{Authorization:`Bearer ${r.state.user.accessToken}`}}).then(t=>{t.data.error||(b.value=Number(t.data.balance).toFixed(2))})}catch(t){console.log("Internal Server Error",t)}},w=()=>{l.value={userId:r.state.user.id,amount:""},u.value={amount:""}};return(t,n)=>(_(),m("div",L,[e("div",N,[e("div",W,[e("div",C,[e("div",U,[e("div",V,[j,e("p",q,"Available balance: $"+p(b.value),1)])]),e("div",z,[e("div",D,[M,e("div",O,[e("div",R,[G,e("div",H,[J,T(e("input",{type:"number",class:"form-control",id:"amount",placeholder:"Please enter your amount for topup",min:"0","onUpdate:modelValue":n[0]||(n[0]=o=>l.value.amount=o)},null,512),[[E,l.value.amount]]),K]),(_(!0),m(k,null,S(u.value.amount,o=>(_(),m("small",{class:"text-danger",key:`${o}-amount`},p(o),1))),128))])]),e("div",Q,[e("button",{class:"btn btn-primary text-white font-bold topup-btn",disabled:a.value,onClick:y},p(a.value?"Please Wait":"Topup Balance"),9,X)])])])])])]),Y,Z]))}},ae=x(ee,[["__scopeId","data-v-c4b3f5af"]]);export{ae as default};
