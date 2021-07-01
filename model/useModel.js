import{useState,useEffect,useRef}from"react";import{useAsyncError}from"../../../hooks/asyncError";import*as tf from"@tensorflow/tfjs";import testImgSrc from"../../../assets/Archivo_019.jpeg";import{useDemoVideo}from"../demoFrames";export const useModel=()=>{const e=useRef(null),[t,r]=useDemoVideo(),s=useAsyncError(),[o,n]=useState(null);useEffect((()=>(null===e.current&&r&&tf.ready().then((()=>{console.log("Using backend: "+tf.getBackend()),c()})).catch((e=>{s(e)})),()=>{})),[r]);const c=()=>{tf.loadGraphModel("./model/model.json").then((t=>{const r=new Image;r.src=testImgSrc,r.onload=()=>{tf.tidy((()=>{const e=tf.browser.fromPixels(r);t.execute(e),a(t)})),e.current=t}})).catch((e=>{s(e)}))},a=async e=>{const t=await f(e,1);console.log("Detections per second = "+t),n(t)},f=async(e,r)=>{console.log("Running test without NMS but with top of class");let s=0,o=0;for(let n=0;n<r;n++)for(let r=0;r<48;r++){const n=new Date,c=[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1]],[a,f,u]=tf.tidy((()=>{const s=tf.browser.fromPixels(t.current[r]),o=e.execute(s),n=tf.reshape(o[0],[-1,4]),c=tf.reshape(o[3],[-1]),a=tf.reshape(o[1],[-1]),f=o[2],u=c.greater(tf.tensor1d([.4]));return[l(n,u).mul(f),l(c,u),l(a,u)]})),i=u.arraySync(),h=a.arraySync(),p=f.arraySync();i.forEach(((e,t)=>{p[t]>c[e][4]&&(c[e]=[h[t][0],h[t][1],h[t][2],h[t][3],p[t]])})),u.dispose(),a.dispose(),f.dispose(),s+=new Date-n,o++}return 1/(s/(1e3*o))},l=(e,t)=>{const r=t.rank,s=e.shape;let o=1;for(let e=0;e<0+r;e++)o*=s[e];const n=s.slice(0,0).concat([o],s.slice(0+r)),c=tf.reshape(e,n),a=tf.reshape(t,[-1]),f=u(a),l=tf.squeeze(f,[1]);return tf.gather(c,l,0)},u=e=>{const t=e.dataSync();return i(e.shape,t)},i=(e,t)=>{const r=[];for(let e=0;e<t.length;e++)t[e]&&r.push(e);const s=tf.buffer(e,"int32"),o=tf.buffer([r.length,e.length],"int32");for(let t=0;t<r.length;t++){const n=s.indexToLoc(r[t]),c=t*e.length;o.values.set(n,c)}return o.toTensor()};return[o,t=>{const r=[[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1]],[s,o,n]=tf.tidy((()=>{const r=e.current.execute(t),s=tf.reshape(r[0],[-1,4]),o=tf.reshape(r[3],[-1]),n=tf.reshape(r[1],[-1]),c=r[2],a=o.greater(tf.tensor1d([.5]));return[l(s,a).mul(c),l(o,a),l(n,a)]})),c=n.arraySync(),a=s.arraySync(),f=o.arraySync();return c.forEach(((e,t)=>{f[t]>r[e][4]&&(r[e]=[a[t][0],a[t][1],a[t][2],a[t][3],f[t]])})),n.dispose(),s.dispose(),o.dispose(),r[1]=[-1,-1,-1,-1,-1],r}]};