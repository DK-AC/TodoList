(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{154:function(t,e,a){t.exports={circular:"AppBarContainer_circular__Q-wa0"}},169:function(t,e,a){t.exports=a(297)},174:function(t,e,a){},197:function(t,e,a){},297:function(t,e,a){"use strict";a.r(e);var r={};a.r(r),a.d(r,"login",(function(){return D})),a.d(r,"isAuth",(function(){return K})),a.d(r,"logout",(function(){return V}));var n={};a.r(n),a.d(n,"fetchTasks",(function(){return U})),a.d(n,"addTask",(function(){return Y})),a.d(n,"removeTask",(function(){return J})),a.d(n,"updateTask",(function(){return H}));var i={};a.r(i),a.d(i,"fetchTodolists",(function(){return G})),a.d(i,"addTodolist",(function(){return Z})),a.d(i,"removeTodolist",(function(){return tt})),a.d(i,"updateTodolistTitle",(function(){return et}));var o=a(0),c=a.n(o),s=a(37),u=a.n(s);a(174),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(25),d=a(35),p=a(68),f=a(19),m=Object(f.c)({name:"app",initialState:{appStatus:"idle",error:null},reducers:{setAppStatusAC:function(t,e){t.appStatus=e.payload.appStatus},setAppErrorAC:function(t,e){t.error=e.payload.error}}}),b=m.actions,h=b.setAppStatusAC,v=b.setAppErrorAC,g=a(16),k=a.n(g),E=a(24),j=function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a&&e.dispatch(v({error:t.messages.length?t.messages[0]:"Some error occurred"})),e.dispatch(h({appStatus:"failed"})),e.rejectWithValue({errors:t.messages,fieldsErrors:t.fieldsErrors})},O=function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a&&e.dispatch(v({error:t.message?t.message:"Some error occurred"})),e.dispatch(h({appStatus:"failed"})),e.rejectWithValue({errors:[t.message],fieldsErrors:void 0})},y=a(55),x=a.n(y),w=x.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"a32b35ae-c578-47f3-b8a9-0885cd248a9d"}}),I=function(t){return w.post("/auth/login",t)},C=function(){return w.get("/auth/me")},S=function(){return w.delete("/auth/login")},T=x.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"a32b35ae-c578-47f3-b8a9-0885cd248a9d"}}),A=function(t){return T.get("todo-lists/".concat(t,"/tasks"))},L=function(t,e){return T.post("todo-lists/".concat(t,"/tasks"),{title:e})},z=function(t,e){return T.delete("todo-lists/".concat(t,"/tasks/").concat(e))},F=function(t,e,a){return T.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},P=x.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"a32b35ae-c578-47f3-b8a9-0885cd248a9d"}}),R=function(){return P.get("todo-lists")},q=function(t){return P.post("todo-lists",{title:t})},W=function(t){return P.delete("todo-lists/".concat(t))},B=function(t,e){return P.put("todo-lists/".concat(t),{title:e})},D=Object(f.b)("auth/login",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,I(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return");case 10:return t.abrupt("return",j(r.data,a));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),K=Object(f.b)("auth/isAuth",function(){var t=Object(E.a)(k.a.mark((function t(e,a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C();case 2:0===t.sent.data.resultCode&&a.dispatch(M({isLoggedIn:!0}));case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),V=Object(f.b)("auth/logout",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,S();case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return");case 10:return t.abrupt("return",j(r.data,a));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),_=Object(f.c)({name:"auth",initialState:{isInitialized:!1,isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.isLoggedIn}},extraReducers:function(t){t.addCase(D.fulfilled,(function(t){t.isLoggedIn=!0})).addCase(V.fulfilled,(function(t){t.isLoggedIn=!1})).addCase(K.fulfilled,(function(t){t.isInitialized=!0}))}}),M=_.actions.setIsLoggedInAC,N=a(32),U=Object(f.b)("tasks/fetchTasks",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,A(e);case 4:return r=t.sent,a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",{todolistId:e,tasks:r.data.items});case 9:return t.prev=9,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a));case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,a){return t.apply(this,arguments)}}()),Y=Object(f.b)("tasks/addTask",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,L(e.todolistId,e.title);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",r.data.data.item);case 10:return t.abrupt("return",j(r.data,a,!1));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a,!1));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),J=Object(f.b)("tasks/removeTask",function(){var t=Object(E.a)(k.a.mark((function t(e,a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.next=3,z(e.todolistId,e.taskId);case 3:return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",e);case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),H=Object(f.b)("tasks/updateTask",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r,n,i,o;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.getState(),n=r.tasks[e.todolistId].find((function(t){return t.id===e.taskId}))){t.next=4;break}return t.abrupt("return",a.rejectWithValue("task not found in the state"));case 4:return i=Object(N.a)({deadline:n.deadline,description:n.description,priority:n.priority,startDate:n.startDate,title:n.title,status:n.status},e.model),a.dispatch(h({appStatus:"loading"})),t.prev=6,t.next=9,F(e.todolistId,e.taskId,i);case 9:if(0!==(o=t.sent).data.resultCode){t.next=15;break}return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",e);case 15:return t.abrupt("return",j(o.data,a));case 16:t.next=21;break;case 18:return t.prev=18,t.t0=t.catch(6),t.abrupt("return",O(t.t0,a));case 21:case"end":return t.stop()}}),t,null,[[6,18]])})));return function(e,a){return t.apply(this,arguments)}}()),Q=Object(f.c)({name:"todolists",initialState:[],reducers:{changeTodolistFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));-1!==a&&(t[a].filter=e.payload.filter)},changeTodolistStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));-1!==a&&(t[a].status=e.payload.status)}},extraReducers:function(t){t.addCase(Z.fulfilled,(function(t,e){t.unshift(Object(N.a)(Object(N.a)({},e.payload.todolist),{},{filter:"all",status:"idle"}))})).addCase(G.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(N.a)(Object(N.a)({},t),{},{filter:"all",status:"idle"})}))})).addCase(tt.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));-1!==a&&t.splice(a,1)})).addCase(et.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));-1!==a&&(t[a].title=e.payload.title)}))}}),X=Q.actions,$=(X.changeTodolistFilterAC,X.changeTodolistStatusAC),G=Object(f.b)("todolists/fetchTodolists",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,R();case 4:return r=t.sent,a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",{todolists:r.data});case 9:return t.prev=9,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a));case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,a){return t.apply(this,arguments)}}()),Z=Object(f.b)("todolists/addTodolist",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,q(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",{todolist:r.data.data.item});case 10:return t.abrupt("return",j(r.data,a,!0));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a,!1));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(f.b)("todolists/removeTodolist",function(){var t=Object(E.a)(k.a.mark((function t(e,a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),a.dispatch($({todolistId:e,status:"loading"})),t.next=4,W(e);case 4:return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",{todolistId:e});case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),et=Object(f.b)("todolists/updateTodolistTitle",function(){var t=Object(E.a)(k.a.mark((function t(e,a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(h({appStatus:"loading"})),t.prev=1,t.next=4,B(e.todolistId,e.title);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(h({appStatus:"succeeded"})),t.abrupt("return",{todolistId:e.todolistId,title:e.title});case 10:return t.abrupt("return",j(r.data,a));case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t.catch(1),t.abrupt("return",O(t.t0,a,!1));case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e,a){return t.apply(this,arguments)}}()),at=Object(f.c)({name:"tasks",initialState:{},reducers:{},extraReducers:function(t){t.addCase(Y.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)})).addCase(J.fulfilled,(function(t,e){var a=t[e.payload.todolistId].findIndex((function(t){return t.id===e.payload.taskId}));-1!==a&&t[e.payload.todolistId].splice(a,1)})).addCase(G.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){return t[e.id]=[]}))})).addCase(U.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})).addCase(H.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));-1!==r&&(a[r]=Object(N.a)(Object(N.a)({},a[r]),e.payload.model))})).addCase(Z.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]}))}}),rt=m.reducer,nt=_.reducer,it=at.reducer,ot=Q.reducer,ct=Object(d.c)({todolists:ot,tasks:it,app:rt,auth:nt}),st=Object(f.a)({reducer:ct,middleware:function(t){return t().prepend(p.a)}});window.store=st;a(197);var ut=a(357),lt=a(353),dt=a(343),pt=a(354),ft=a(351),mt=a(356),bt=a(358),ht=a(359),vt=a(348),gt=a(346),kt=function(){return Object(l.b)()};function Et(t){var e=kt();return Object(o.useMemo)((function(){return Object(d.b)(t,e)}),[])}var jt=function(t){return t.app.error},Ot=function(t){return t.app.appStatus},yt=function(t){return t.auth.isInitialized},xt=function(t){return t.auth.isLoggedIn},wt=function(t){return t.todolists},It=o.forwardRef((function(t,e){return o.createElement(gt.a,Object.assign({elevation:6,ref:e,variant:"filled"},t))})),Ct=function(){var t=kt(),e=Object(l.c)(jt),a=function(e,a){"clickaway"!==a&&t(v({error:null}))};return o.createElement(vt.a,{open:!!e,autoHideDuration:6e3,onClose:a},o.createElement(It,{onClose:a,severity:"error",sx:{width:"100%"}},e))},St=a(15),Tt=a(352),At=a(11),Lt=a(340),zt=a(344),Ft=c.a.memo((function(t){var e=t.callback,a=t.disabled,r=void 0!==a&&a,n=Object(o.useState)(""),i=Object(At.a)(n,2),s=i[0],u=i[1],l=Object(o.useState)(null),d=Object(At.a)(l,2),p=d[0],f=d[1],m=function(){""!==s.trim()?e(s,{setTitle:u,setError:f}):f("Title is required")};return c.a.createElement("div",null,c.a.createElement(zt.a,{variant:"outlined",value:s,onChange:function(t){var e=t.currentTarget.value;e.length>=0&&(u(e),f(null))},onKeyPress:function(t){null!==p&&f(null),"Enter"===t.key&&m()},size:"small",error:!!p,label:"Title",helperText:p,disabled:r}),c.a.createElement(lt.a,{color:"primary",onClick:m,size:"small",disabled:r,style:{marginLeft:"5px"}},c.a.createElement(Lt.a,null)))})),Pt=Object(N.a)(Object(N.a)({},i),Q.actions),Rt=Object(N.a)(Object(N.a)({},r),_.actions),qt=c.a.memo((function(t){var e=t.title,a=t.onChange,r=t.disabled,n=void 0!==r&&r,i=Object(o.useState)(!1),s=Object(At.a)(i,2),u=s[0],l=s[1],d=Object(o.useState)(e),p=Object(At.a)(d,2),f=p[0],m=p[1];return u?c.a.createElement("input",{value:f,onChange:function(t){m(t.currentTarget.value)},autoFocus:!0,onBlur:function(){l(!1),a(f)},disabled:n}):c.a.createElement("span",{onDoubleClick:function(){l(!0),m(f)}},f)})),Wt=a(341),Bt=a(347),Dt=c.a.memo((function(t){var e=t.todolistId,a=t.task,r=Et(n),i=r.removeTask,o=r.updateTask;return c.a.createElement("div",{key:a.id,style:{position:"relative"}},c.a.createElement(Bt.a,{color:"primary",checked:0!==a.status,onChange:function(t){o({todolistId:e,taskId:a.id,model:{status:t.currentTarget.checked?1:0}})},size:"small"}),c.a.createElement(qt,{title:a.title,onChange:function(t){o({todolistId:e,taskId:a.id,model:{title:t}})}}),c.a.createElement(lt.a,{onClick:function(){i({todolistId:e,taskId:a.id})},size:"small",style:{position:"absolute",top:"2px",right:"-5px"}},c.a.createElement(Wt.a,{fontSize:"small"})))})),Kt=a(362),Vt=c.a.memo((function(t){var e=t.todo,a=t.demo,r=void 0!==a&&a,i=kt(),s=Et(Pt),u=s.updateTodolistTitle,d=s.removeTodolist,p=s.changeTodolistFilterAC,f=Et(n).fetchTasks,m=Object(l.c)((function(t){return t.tasks[e.id]}));Object(o.useEffect)((function(){r||m.length||f(e.id)}),[]);var b=Object(o.useCallback)(function(){var t=Object(E.a)(k.a.mark((function t(a,r){var o,c,s,u,l;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=n.addTask({todolistId:e.id,title:a}),t.next=3,i(o);case 3:c=t.sent,n.addTask.rejected.match(c)?(null===(s=c.payload)||void 0===s||null===(u=s.errors)||void 0===u?void 0:u.length)?(l=c.payload.errors[0],r.setError(l)):r.setError("Some error occurred"):r.setTitle("");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),[]),h=function(t){p({todolistId:e.id,filter:t})},v=m;"active"===e.filter&&(v=v.filter((function(t){return!t.status}))),"completed"===e.filter&&(v=v.filter((function(t){return t.status})));var g=function(t,a,r,n){return c.a.createElement(ft.a,{variant:e.filter===r?"outlined":"text",onClick:function(){return h(r)},color:n},a)};return c.a.createElement(Kt.a,{style:{padding:"10px",position:"relative"}},c.a.createElement(lt.a,{onClick:function(){d(e.id)},disabled:"loading"===e.status,size:"small",style:{position:"absolute",top:"5x",right:"5px"}},c.a.createElement(Wt.a,{fontSize:"small"})),c.a.createElement("h3",null,c.a.createElement(qt,{title:e.title,onChange:function(t){u({todolistId:e.id,title:t})}})),c.a.createElement("div",null,c.a.createElement(Ft,{callback:b,disabled:"loading"===e.status}),v.map((function(t){return c.a.createElement(Dt,{key:e.id+t.id,todolistId:e.id,task:t})})),!v.length&&c.a.createElement("div",{style:{padding:"10px",color:"gray"}},"No task")),c.a.createElement("div",{style:{paddingTop:"10px"}},g(0,"all","all","inherit"),g(0,"active","active","primary"),g(0,"completed","completed","secondary")))})),_t=function(t){var e=t.demo,a=kt(),r=Object(St.f)(),n=Et(Pt).fetchTodolists,i=Object(l.c)(wt),s=Object(l.c)((function(t){return t.tasks})),u=Object(l.c)(xt),d=Object(o.useCallback)(function(){var t=Object(E.a)(k.a.mark((function t(e,r){var n,i,o,c,s;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Pt.addTodolist(e),t.next=3,a(n);case 3:i=t.sent,Pt.addTodolist.rejected.match(i)?(null===(o=i.payload)||void 0===o||null===(c=o.errors)||void 0===c?void 0:c.length)?(s=i.payload.errors[0],r.setError(s)):r.setError("Some error occurred"):r.setTitle("");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),[]);return Object(o.useEffect)((function(){!e&&u&&(i.length||n())}),[]),u||r("/login"),c.a.createElement(c.a.Fragment,null,c.a.createElement(Tt.a,{container:!0,style:{padding:"20px"}},c.a.createElement(Ft,{callback:d})),c.a.createElement(Tt.a,{container:!0,spacing:3,style:{flexWrap:"nowrap",overflowX:"scroll"}},i.map((function(t){var a=s[t.id];return c.a.createElement(Tt.a,{item:!0,key:t.id},c.a.createElement("div",{style:{width:"300px"}},c.a.createElement(Vt,{todo:t,demo:e,tasks:a})))}))))},Mt=a(349),Nt=a(361),Ut=a(360),Yt=a(339),Jt=a(155),Ht=a(88),Qt=function(){var t=kt(),e=Object(St.f)(),a=Et(Rt).login,r=Object(l.c)(xt),n=Object(Jt.a)({initialValues:{email:"",password:"",rememberMe:!1},validationSchema:Ht.a({email:Ht.b().email("Invalid email address").required("Required"),password:Ht.b().min(8,"Password must be at least 8 characters").required("Required")}),onSubmit:function(){var e=Object(E.a)(k.a.mark((function e(r,n){var i,o,c,s;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(a(r));case 2:i=e.sent,a.rejected.match(i)&&(null===(o=i.payload)||void 0===o||null===(c=o.fieldsErrors)||void 0===c?void 0:c.length)&&(s=i.payload.fieldsErrors[0],n.setFieldError(s.field,s.error));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()});return Object(o.useEffect)((function(){r&&e("/")}),[r]),c.a.createElement(Tt.a,{container:!0,justifyContent:"center"},c.a.createElement(Tt.a,{item:!0,justifyContent:"center"},c.a.createElement("form",{onSubmit:n.handleSubmit},c.a.createElement(Mt.a,null,c.a.createElement(Yt.a,null,c.a.createElement("p",null,"To log in get registered",c.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"}," here")),c.a.createElement("p",null,"or use common test account credentials:"),c.a.createElement("p",null,"Email: free@samuraijs.com"),c.a.createElement("p",null,"Password: zxcnbvasdqwe123")),c.a.createElement(Ut.a,null,c.a.createElement(zt.a,Object.assign({label:"email",margin:"normal"},n.getFieldProps("email"))),n.errors.email?c.a.createElement("div",null,n.errors.email):null,c.a.createElement(zt.a,Object.assign({type:"password",label:"password",margin:"normal"},n.getFieldProps("password"))),c.a.createElement(Nt.a,Object.assign({label:"remember me",control:c.a.createElement(Bt.a,null)},n.getFieldProps("rememberMe"))),c.a.createElement(ft.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},Xt=a(355),$t=a(154),Gt=a.n($t),Zt=function(){var t=Et(Rt),e=t.logout,a=t.isAuth,r=Object(l.c)(Ot),n=Object(l.c)(yt),i=Object(l.c)(xt);Object(o.useEffect)((function(){n||a()}),[]);var s=Object(o.useCallback)((function(){e()}),[n]);return n?c.a.createElement("div",null,c.a.createElement(mt.a,{position:"static"},c.a.createElement(ut.a,null,c.a.createElement(lt.a,{edge:"start",color:"inherit","aria-label":"menu"},c.a.createElement(dt.a,null)),c.a.createElement(pt.a,{variant:"h6"},"News"),i&&c.a.createElement(ft.a,{color:"inherit",onClick:s},"Log Out"))),"loading"===r&&c.a.createElement(bt.a,null),c.a.createElement(ht.a,{fixed:!0},c.a.createElement(St.c,null,c.a.createElement(St.a,{path:"/",element:c.a.createElement(_t,{demo:!1})}),c.a.createElement(St.a,{path:"/login",element:c.a.createElement(Qt,null)}))),c.a.createElement(Ct,null)):c.a.createElement("div",{className:Gt.a.circular},c.a.createElement(Xt.a,null))},te=function(){return c.a.createElement(Zt,null)},ee=a(66);u.a.render(c.a.createElement(l.a,{store:st},c.a.createElement(ee.a,null,c.a.createElement(te,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[169,1,2]]]);
//# sourceMappingURL=main.40cfe74d.chunk.js.map