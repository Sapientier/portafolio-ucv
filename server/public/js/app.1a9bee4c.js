(function(t){function e(e){for(var r,n,o=e[0],c=e[1],l=e[2],u=0,v=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&v.push(i[n][0]),i[n]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);d&&d(e);while(v.length)v.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(r=!1)}r&&(s.splice(e--,1),t=n(n.s=a[0]))}return t}var r={},i={app:0},s=[];function n(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=r,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(a,r,function(e){return t[e]}.bind(null,r));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("page-header"),a("v-content",[a("transition",{attrs:{name:"fade-transition",mode:"out-in"}},[a("router-view")],1)],1)],1)},s=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-navigation-drawer",{attrs:{clipped:t.$vuetify.breakpoint.lgAndUp,app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{attrs:{link:"",to:"/"}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-home")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Inicio")])],1)],1),a("v-list-item",{attrs:{link:"",to:"/services"}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-book-open")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Servicios")])],1)],1),t.$store.state.isUserLoggedIn&&t.$store.state.user.isAdmin?a("v-list-item",{attrs:{link:"",to:"/userstable"}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-table-edit")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Tabla de Usuarios")])],1)],1):t._e(),t.$store.state.isUserLoggedIn?t._e():a("v-list-item",{attrs:{link:"",to:"/login"}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-login")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Iniciar Sesión")])],1)],1),t.$store.state.isUserLoggedIn?a("v-list-item",{attrs:{link:""},on:{click:t.logout}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-logout")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Cerrar Sesión")])],1)],1):t._e()],1),a("v-bottom-navigation",{attrs:{absolute:"",color:"indigo"},model:{value:t.bottomNav,callback:function(e){t.bottomNav=e},expression:"bottomNav"}},[a("v-btn",[a("v-icon",[t._v("mdi-twitter")])],1),a("v-btn",[a("v-icon",[t._v("mdi-youtube")])],1),a("v-btn",[a("v-icon",[t._v("mdi-facebook")])],1)],1)],1),a("v-app-bar",{attrs:{"clipped-left":t.$vuetify.breakpoint.lgAndUp,app:"",color:"indigo",dark:""}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",{staticClass:"ml-0 pl-4",staticStyle:{width:"300px"}},[a("span",{staticClass:"hidden-sm-and-down home",attrs:{title:"Pagina de Inicio"},on:{click:function(e){return t.navigateTo({name:"Home"})}}},[t._v("Portafolio Digital UCV")])]),a("v-spacer"),t.$store.state.isUserLoggedIn?a("v-btn",{attrs:{icon:""}},[a("v-badge",{attrs:{overlap:""},scopedSlots:t._u([{key:"badge",fn:function(){return[t._v("0")]},proxy:!0}],null,!1,2411242568)},[a("v-icon",[t._v("mdi-bell")])],1)],1):t._e(),t.$store.state.isUserLoggedIn?a("v-btn",{attrs:{icon:""},on:{click:function(e){return t.navigateTo({name:"UserProfile"})}}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-icon",t._g({},r),[t._v("mdi-account")])]}}],null,!1,2165573058)},[a("span",[t._v("Perfil de Usuario")])])],1):t._e(),t.$store.state.isUserLoggedIn?a("v-btn",{attrs:{icon:""},on:{click:t.logout}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-icon",t._g({},r),[t._v("mdi-power")])]}}],null,!1,3847322332)},[a("span",[t._v("Cerrar Sesión")])])],1):t._e()],1)],1)},o=[],c={methods:{navigateTo:function(t){this.$router.push(t).catch((function(t){}))},logout:function(){this.$store.dispatch("setToken",null),this.$store.dispatch("setUser",null),this.$router.push({name:"Home"})}},data:function(){return{drawer:null}}},l=c,d=(a("5a6f"),a("2877")),u=a("6544"),v=a.n(u),m=a("40dc"),p=a("5bc1"),f=a("4ca6"),h=a("b81c"),b=a("8336"),g=a("132d"),x=a("8860"),k=a("da13"),w=a("1800"),_=a("5d23"),V=a("f774"),y=a("2fa4"),C=a("2a7f"),I=a("3a2f"),A=Object(d["a"])(l,n,o,!1,null,"2e706874",null),j=A.exports;v()(A,{VAppBar:m["a"],VAppBarNavIcon:p["a"],VBadge:f["a"],VBottomNavigation:h["a"],VBtn:b["a"],VIcon:g["a"],VList:x["a"],VListItem:k["a"],VListItemAction:w["a"],VListItemContent:_["a"],VListItemTitle:_["b"],VNavigationDrawer:V["a"],VSpacer:y["a"],VToolbarTitle:C["a"],VTooltip:I["a"]});var T={name:"App",components:{PageHeader:j},data:function(){return{}}},D=T,O=a("7496"),U=a("a75b"),$=Object(d["a"])(D,i,s,!1,null,null,null),P=$.exports;v()($,{VApp:O["a"],VContent:U["a"]});var S=a("8c4f"),L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{wrap:""}},[a("v-carousel",{attrs:{cycle:"",height:"400","hide-delimiter-background":"","show-arrows-on-hover":""}},t._l(t.items,(function(t,e){return a("v-carousel-item",{key:e,attrs:{src:t.src}})})),1),a("v-card",[a("v-container",{attrs:{fluid:""}},[a("v-row",{attrs:{dense:""}},t._l(t.cards,(function(e){return a("v-col",{key:e.title,attrs:{cols:"12",md:"4",sm:"12"}},[a("v-card",[a("v-img",{staticClass:"white--text align-end",attrs:{src:e.src,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"200px"}}),a("v-card-title",{domProps:{textContent:t._s(e.title)}}),a("v-card-subtitle",{domProps:{textContent:t._s(e.subtitle)}}),a("v-card-actions",[a("v-btn",{attrs:{text:""}},[t._v("Compartir")]),a("v-btn",{attrs:{color:"purple",text:""}},[t._v(" Explorar ")]),a("v-spacer")],1)],1)],1)})),1)],1)],1)],1)],1)},E=[],F={data:function(){return{cards:[{title:"Pre-fab homes",subtitle:"1,000 miles of wonder",src:"https://cdn.vuetifyjs.com/images/cards/house.jpg"},{title:"Favorite road trips",subtitle:"5,000 miles of power",src:"https://cdn.vuetifyjs.com/images/cards/road.jpg"},{title:"Best airlines",subtitle:"3,000 miles of wisdom",src:"https://cdn.vuetifyjs.com/images/cards/plane.jpg"}],items:[{src:"https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/sky.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/bird.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/planet.jpg"}]}}},R=F,B=a("b0af"),M=a("99d9"),N=a("5e66"),q=a("3e35"),H=a("62ad"),z=a("a523"),G=a("adda"),J=a("a722"),Q=a("0fd9"),K=Object(d["a"])(R,L,E,!1,null,null,null),W=K.exports;v()(K,{VBtn:b["a"],VCard:B["a"],VCardActions:M["a"],VCardSubtitle:M["b"],VCardTitle:M["d"],VCarousel:N["a"],VCarouselItem:q["a"],VCol:H["a"],VContainer:z["a"],VImg:G["a"],VLayout:J["a"],VRow:Q["a"],VSpacer:y["a"]});var X=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[a("v-card",{staticClass:"elevation-12"},[a("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[a("v-toolbar-title",[t._v("Inicio de Sesión")])],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{label:"Correo","prepend-icon":"mdi-email",type:"email",rules:[function(){return!!t.email||"Este campo es requerido"}]},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("v-text-field",{attrs:{label:"Contraseña","prepend-icon":"mdi-lock","append-icon":t.show1?"mdi-eye":"mdi-eye-off",type:t.show1?"text":"password",rules:[function(){return!!t.password||"Este campo es requerido"}]},on:{"click:append":function(e){t.show1=!t.show1}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),a("v-alert",{attrs:{type:"error",dismissible:"",transition:"scale-transition"},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[a("div",{domProps:{innerHTML:t._s(t.error)}})]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:t.login}},[t._v("Ingresar")])],1)],1)],1)],1)],1)},Y=[],Z=(a("96cf"),a("89ba")),tt=a("bc3a"),et=a.n(tt),at=function(){return et.a.create({baseURL:"http://localhost:8000/"})},rt={register:function(t){return at().post("register",t)},login:function(t){return at().post("login",t)}},it={data:function(){return{email:"",password:"",show1:!1,error:null,alert:!1}},methods:{login:function(){var t=Object(Z["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,rt.login({email:this.email,password:this.password});case 3:e=t.sent,this.$store.dispatch("setToken",e.data.token),this.$store.dispatch("setUser",e.data.user),this.$router.push({name:"Home"}),t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](0),this.alert=!0,this.error=t.t0.response.data.error;case 13:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(){return t.apply(this,arguments)}return e}()}},st=it,nt=a("0798"),ot=a("4bd4"),ct=a("8654"),lt=a("71d9"),dt=Object(d["a"])(st,X,Y,!1,null,null,null),ut=dt.exports;v()(dt,{VAlert:nt["a"],VBtn:b["a"],VCard:B["a"],VCardActions:M["a"],VCardText:M["c"],VCol:H["a"],VContainer:z["a"],VForm:ot["a"],VRow:Q["a"],VSpacer:y["a"],VTextField:ct["a"],VToolbar:lt["a"],VToolbarTitle:C["a"]});var vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{xs12:"",md12:""}},[a("v-card",[a("v-container",{attrs:{fluid:""}},[a("v-row",{attrs:{dense:""}},t._l(t.cards,(function(e){return a("v-col",{key:e.title,attrs:{cols:"12",sm:"4",xs:"12"}},[a("v-card",[a("v-img",{staticClass:"white--text align-end",attrs:{src:e.src,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"200px"}}),a("v-card-title",{domProps:{textContent:t._s(e.title)}}),a("v-card-subtitle",{domProps:{textContent:t._s(e.subtitle)}}),a("v-card-actions",[a("v-btn",{attrs:{text:""}},[t._v("Compartir")]),a("v-btn",{attrs:{color:"purple",text:""}},[t._v(" Explorar ")])],1)],1)],1)})),1)],1)],1)],1)],1),a("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[t.$store.state.isUserLoggedIn?a("v-btn",t._g({attrs:{dark:"",fab:"",bottom:"",right:"",color:"red",fixed:""}},r),[a("v-icon",[t._v("mdi-plus")])],1):t._e()]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Inserción de Servicio")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-combobox",{attrs:{items:t.itemsel,label:"Categoría*"},model:{value:t.categories,callback:function(e){t.categories=e},expression:"categories"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-combobox",{attrs:{items:t.itemsel2,label:"Denpendencias*"},model:{value:t.dependencies,callback:function(e){t.dependencies=e},expression:"dependencies"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:"Nombre*",required:""}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.date,transition:"scale-transition","offset-y":"","min-width":"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-text-field",t._g({attrs:{label:"Fecha de Publicación *","prepend-icon":"mdi-calendar",readonly:""},on:{blur:function(e){t.date=t.parseDate(t.dateFormatted)}},model:{value:t.computedDateFormatted,callback:function(e){t.computedDateFormatted=e},expression:"computedDateFormatted"}},r))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",scrollable:"",locale:"es-es"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.date)}}},[t._v("Aceptar")])],1)],1)],1),a("v-col",{attrs:{cols:"12"}},[a("v-textarea",{attrs:{label:"Descripción"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:"Autor *"},model:{value:t.autor,callback:function(e){t.autor=e},expression:"autor"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-file-input",{attrs:{label:"Imagen"}})],1)],1)],1),a("small",[t._v("*Indica que es un campo requerido")])],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cerrar")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Guardar")])],1)],1)],1)],1)},mt=[],pt=(a("99af"),a("accc"),a("0d03"),a("ac1f"),a("1276"),a("e587")),ft={data:function(){return{cards:[{title:"Medicina",subtitle:"1,000 miles of wonder",src:"https://cdn.vuetifyjs.com/images/cards/house.jpg",show:!1},{title:"Tecnología",subtitle:"5,000 miles of power",src:"https://cdn.vuetifyjs.com/images/cards/road.jpg",show:!1},{title:"Química",subtitle:"3,000 miles of wisdom",src:"https://cdn.vuetifyjs.com/images/cards/plane.jpg",show:!1},{title:"Alimentos",subtitle:"1,000 miles of wonder",src:"https://cdn.vuetifyjs.com/images/cards/house.jpg",show:!1},{title:"Educación",subtitle:"5,000 miles of power",src:"https://cdn.vuetifyjs.com/images/cards/road.jpg",show:!1},{title:"Mercadeo",subtitle:"3,000 miles of wisdom",src:"https://cdn.vuetifyjs.com/images/cards/plane.jpg",show:!1}],date:(new Date).toISOString().substr(0,10),menu:!1,autor:"",dependencies:"",categories:"",itemsel:["Medicina","Química","Tecnología","Alimentos","Eduación","Mercadeo"],itemsel2:["Coordinador General","Coordinador de Extensión","Coordinador de Investigación","Profesor/Investigador"],dialog:!1}},computed:{computedDateFormatted:function(){return this.formatDate(this.date)}},methods:{formatDate:function(t){if(!t)return null;var e=t.split("-"),a=Object(pt["a"])(e,3),r=a[0],i=a[1],s=a[2];return"".concat(s,"/").concat(i,"/").concat(r)}}},ht=ft,bt=a("2b5d"),gt=a("2e4b"),xt=a("169a"),kt=a("23a7"),wt=a("0e8f"),_t=a("e449"),Vt=a("a844"),yt=Object(d["a"])(ht,vt,mt,!1,null,null,null),Ct=yt.exports;v()(yt,{VBtn:b["a"],VCard:B["a"],VCardActions:M["a"],VCardSubtitle:M["b"],VCardText:M["c"],VCardTitle:M["d"],VCol:H["a"],VCombobox:bt["a"],VContainer:z["a"],VDatePicker:gt["a"],VDialog:xt["a"],VFileInput:kt["a"],VFlex:wt["a"],VIcon:g["a"],VImg:G["a"],VLayout:J["a"],VMenu:_t["a"],VRow:Q["a"],VSpacer:y["a"],VTextField:ct["a"],VTextarea:Vt["a"]});var It=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{xs12:"",md8:""}},[a("v-card",[a("v-form",[a("v-container",{attrs:{"py-0":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{label:"Dependencia",disabled:""}})],1),a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{value:t.$store.state.user.email,label:"Correo Electrónico"}})],1),a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{label:"Nombre"}})],1),a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{label:"Apellido"}})],1),a("v-flex",{attrs:{xs12:"",md12:""}},[a("v-text-field",{attrs:{label:"Dirección"}})],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-text-field",{attrs:{label:"Ciudad"}})],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-text-field",{attrs:{label:"País"}})],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-text-field",{attrs:{label:"Codigo Postal",type:"number"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-textarea",{attrs:{label:"Acerca de mí"}})],1),a("v-flex",{attrs:{xs12:"","text-xs-right":""}},[a("v-btn",{staticClass:"mx-0 font-weight-light",attrs:{color:"primary"}},[t._v(" Actualizar Perfil ")])],1)],1)],1)],1)],1)],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-card",[a("v-avatar",{staticClass:"mx-auto d-block",attrs:{size:"130"}},[a("img",{attrs:{src:"https://bookingagentinfo.com/wp-content/uploads/2014/12/Travis-Scott-Contact-Information.jpg"}})]),a("v-card-text",{staticClass:"text-xs-center"},[a("h6",{staticClass:"category text-gray font-weight-thin mb-3"},[t._v("CEO / CO-FOUNDER - Astroworld")]),a("h4",{staticClass:"card-title font-weight-light"},[t._v("Brian Torres")]),a("p",{staticClass:"card-description font-weight-light"},[t._v("Lorem Ipsum")])])],1)],1)],1)],1)},At=[],jt={},Tt=jt,Dt=a("8212"),Ot=Object(d["a"])(Tt,It,At,!1,null,null,null),Ut=Ot.exports;v()(Ot,{VAvatar:Dt["a"],VBtn:b["a"],VCard:B["a"],VCardText:M["c"],VContainer:z["a"],VFlex:wt["a"],VForm:ot["a"],VLayout:J["a"],VTextField:ct["a"],VTextarea:Vt["a"]});var $t,Pt,St=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("v-card",[a("v-card-title",[a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.UserList,search:t.search,page:t.page,"items-per-page":t.itemsPerPage,"hide-default-footer":""},on:{"update:page":function(e){t.page=e},"page-count":function(e){t.pageCount=e}},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("Administración de Usuarios")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{persistent:"","max-width":"350px"},model:{value:t.dialog2,callback:function(e){t.dialog2=e},expression:"dialog2"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Atención")])]),a("v-card-text",[t._v(" ¿Esta seguro que desea eliminar este usuario? ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancelar")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.deleteval}},[t._v("Aceptar")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},r),[t._v("Agregar")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-text-field",{attrs:{label:"Correo",type:"email"},model:{value:t.editedItem.email,callback:function(e){t.$set(t.editedItem,"email",e)},expression:"editedItem.email"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-text-field",{attrs:{label:"Contraseña","append-icon":t.show1?"mdi-eye":"mdi-eye-off",type:t.show1?"text":"password"},on:{"click:append":function(e){t.show1=!t.show1}},model:{value:t.editedItem.password,callback:function(e){t.$set(t.editedItem,"password",e)},expression:"editedItem.password"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-switch",{attrs:{label:"Administrador"},model:{value:t.editedItem.isAdmin,callback:function(e){t.$set(t.editedItem,"isAdmin",e)},expression:"editedItem.isAdmin"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-switch",{attrs:{label:"Bloqueado"},model:{value:t.editedItem.isActive,callback:function(e){t.$set(t.editedItem,"isActive",e)},expression:"editedItem.isActive"}})],1),a("v-col",{attrs:{col:"12",sm:"8",md:"8"}},[a("v-combobox",{attrs:{items:t.itemsel,label:"Dependencias"},model:{value:t.editedItem.Dependencies,callback:function(e){t.$set(t.editedItem,"Dependencies",e)},expression:"editedItem.Dependencies"}})],1)],1)],1)],1),a("v-alert",{attrs:{type:"error",dismissible:"",transition:"scale-transition"},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[a("div",{domProps:{innerHTML:t._s(t.error)}})]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancelar")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("Aceptar")])],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(e){var r=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(r)}}},[t._v(" mdi-pencil ")]),a("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(r)}}},[t._v(" mdi-delete ")])]}},{key:"item.isAdmin",fn:function(e){var r=e.item;return[a("v-checkbox",{attrs:{disabled:""},model:{value:r.isAdmin,callback:function(e){t.$set(r,"isAdmin",e)},expression:"item.isAdmin"}})]}},{key:"item.isActive",fn:function(e){var r=e.item;return[a("v-checkbox",{attrs:{disabled:""},model:{value:r.isActive,callback:function(e){t.$set(r,"isActive",e)},expression:"item.isActive"}})]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("Reiniciar")])]},proxy:!0}])}),a("div",{staticClass:"text-center pt-2"},[a("v-pagination",{attrs:{length:t.pageCount},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1),a("v-snackbar",{attrs:{timeout:3e3,color:t.snackColor},model:{value:t.snack,callback:function(e){t.snack=e},expression:"snack"}},[t._v(" "+t._s(t.snackText)+" "),a("v-btn",{attrs:{text:""},on:{click:function(e){t.snack=!1}}},[t._v("Cerrar")])],1)],1)],1)],1)],1)},Lt=[],Et=(a("c975"),a("a434"),{getusers:function(){return at().get("getusers")},updateusers:function(t){return at().post("updateusers",t)},deleteusers:function(t){return at().post("deleteusers",t)}}),Ft={data:function(){return{page:1,pageCount:0,itemsPerPage:10,show1:!1,error:null,alert:!1,snack:!1,snackColor:"",snackText:"",UserList:[],dialog:!1,dialog2:!1,itemsel:["Coordinador General","Coordinador de Extensión","Coordinador de Investigación","Profesor/Investigador"],search:"",headers:[{text:"Correo",value:"email"},{text:"Administrador",value:"isAdmin"},{text:"Bloqueado",value:"isActive"},{text:"Dependencia",value:"Dependencies"},{text:"Acciones",value:"action",sortable:!1}],editedIndex:-1,editedItem:{_id:"",password:"",email:"",isAdmin:!1,isActive:!1,Dependencies:""},defaultItem:{_id:"",password:"",email:"",isAdmin:!1,isActive:!1,Dependencies:""}}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Usuario":"Editar Usuario"}},watch:{dialog:function(t){t||this.close()},dialog2:function(t){t||this.close()}},created:function(){this.initialize()},methods:{initialize:function(){var t=Object(Z["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Et.getusers().then((function(t){e.UserList=t.data})).catch((function(t){return console.log(t)}));case 2:t.sent;case 3:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}(),editItem:function(t){this.editedIndex=this.UserList.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){this.editedIndex=this.UserList.indexOf(t),this.editedItem=Object.assign({},t),this.dialog2=!0},deleteval:function(){var t=Object(Z["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Et.deleteusers({_id:this.editedItem._id}).then((function(t){return e.delete()}));case 3:t.sent,this.UserList.splice(this.editedIndex,1),this.close(),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),this.error=t.t0.response.data.error;case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(){return t.apply(this,arguments)}return e}(),close:function(){var t=this;this.dialog=!1,this.dialog2=!1,this.alert=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},save:function(){var t=Object(Z["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(this.editedIndex>-1)){t.next=15;break}return t.prev=1,t.next=4,Et.updateusers({_id:this.editedItem._id,email:this.editedItem.email,isAdmin:this.editedItem.isAdmin,isActive:this.editedItem.isActive,Dependencies:this.editedItem.Dependencies}).then((function(t){return e.updateInline()}));case 4:t.sent,Object.assign(this.UserList[this.editedIndex],this.editedItem),this.close(),t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](1),this.alert=!0,this.error=t.t0.response.data.error;case 13:t.next=27;break;case 15:return t.prev=15,t.next=18,rt.register({email:this.editedItem.email,password:this.editedItem.password,isAdmin:this.editedItem.isAdmin,isActive:this.editedItem.isActive,Dependencies:this.editedItem.Dependencies}).then((function(t){return e.saveInline()}));case 18:t.sent,this.UserList.push(this.editedItem),this.close(),t.next=27;break;case 23:t.prev=23,t.t1=t["catch"](15),this.alert=!0,this.error=t.t1.response.data.error;case 27:case"end":return t.stop()}}),t,this,[[1,9],[15,23]])})));function e(){return t.apply(this,arguments)}return e}(),updateInline:function(){this.snack=!0,this.snackColor="success",this.snackText="Datos actualizados"},saveInline:function(){this.snack=!0,this.snackColor="success",this.snackText="Datos guardados"},delete:function(){this.snack=!0,this.snackColor="success",this.snackText="Datos eliminados"}}},Rt=Ft,Bt=a("ac7c"),Mt=a("8fea"),Nt=a("ce7e"),qt=a("891e"),Ht=a("2db4"),zt=a("b73d"),Gt=Object(d["a"])(Rt,St,Lt,!1,null,null,null),Jt=Gt.exports;v()(Gt,{VAlert:nt["a"],VBtn:b["a"],VCard:B["a"],VCardActions:M["a"],VCardText:M["c"],VCardTitle:M["d"],VCheckbox:Bt["a"],VCol:H["a"],VCombobox:bt["a"],VContainer:z["a"],VDataTable:Mt["a"],VDialog:xt["a"],VDivider:Nt["a"],VFlex:wt["a"],VIcon:g["a"],VLayout:J["a"],VPagination:qt["a"],VRow:Q["a"],VSnackbar:Ht["a"],VSpacer:y["a"],VSwitch:zt["a"],VTextField:ct["a"],VToolbar:lt["a"],VToolbarTitle:C["a"]});var Qt={},Kt=Object(d["a"])(Qt,$t,Pt,!1,null,null,null),Wt=Kt.exports;r["a"].use(S["a"]);var Xt=new S["a"]({mode:"history",routes:[{path:"/",name:"Home",component:W},{path:"/login",name:"Login",component:ut},{path:"/services",name:"Services",component:Ct},{path:"/userprofile",name:"UserProfile",component:Ut},{path:"/userstable",name:"UsersTable",component:Jt},{path:"/reports",name:"Reports",component:Wt}]}),Yt=a("f309");r["a"].use(Yt["a"]);var Zt=new Yt["a"]({}),te=a("31bd"),ee=a("2f62");r["a"].use(ee["a"]);var ae=new ee["a"].Store({strict:!0,state:{token:null,user:null,isUserLoggedIn:!1},mutations:{setToken:function(t,e){t.token=e,t.isUserLoggedIn=!!e},setUser:function(t,e){t.user=e}},actions:{setToken:function(t,e){var a=t.commit;a("setToken",e)},setUser:function(t,e){var a=t.commit;a("setUser",e)}}});r["a"].config.productionTip=!1,Object(te["sync"])(ae,Xt),new r["a"]({render:function(t){return t(P)},vuetify:Zt,router:Xt,store:ae}).$mount("#app")},"5a6f":function(t,e,a){"use strict";var r=a("9c9c"),i=a.n(r);i.a},"9c9c":function(t,e,a){}});
//# sourceMappingURL=app.1a9bee4c.js.map