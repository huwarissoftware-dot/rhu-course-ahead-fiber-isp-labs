// Day 4 final verification — RHU Course Ahead — Fiber & ISP Labs
// Boots the real web-app/index.html scripts in a VM with DOM/localStorage stubs.
// Phase A (EN, fresh): titles fix, all 50 labs end-to-end, quizzes, tickets,
//   mock, tools math, builder verdicts, certificate, interview.
// Phase B (same localStorage store, fresh boot): save persistence.
// Phase C (UR, fresh): UR titles, all 50 labs end-to-end, UR quiz + ticket,
//   no notice screens, EN round-trip purity.
const fs = require("fs"), vm = require("vm");
const html = fs.readFileSync(__dirname + "/../web-app/index.html", "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (!scripts.length) { console.log("NO SCRIPTS FOUND"); process.exit(2); }

let PASS = 0, FAIL = 0; const fails = [];
function ok(cond, name) { if (cond) PASS++; else { FAIL++; fails.push(name); } }

function makeEl(id) {
  return { id: id || "", _html: "", textContent: "", value: "", disabled: false, style: {}, children: [],
    classList: { _s: new Set(),
      add(c){ this._s.add(c); }, remove(c){ this._s.delete(c); },
      toggle(c, force){ if (force === undefined) force = !this._s.has(c); force ? this._s.add(c) : this._s.delete(c); return force; },
      contains(c){ return this._s.has(c); } },
    set innerHTML(v){ this._html = String(v); }, get innerHTML(){ return this._html; },
    addEventListener(){}, appendChild(){}, querySelector(){ return makeEl(); }, querySelectorAll(){ return []; } };
}

function boot(store) {
  const els = {};
  const sandbox = {
    console, JSON, Math, Date, parseFloat, parseInt, isNaN, String, Number, Array, Object,
    setInterval: () => 0, clearInterval: () => {},
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    document: {
      getElementById: id => { if (!els[id]) els[id] = makeEl(id); return els[id]; },
      createElement: () => makeEl(), querySelectorAll: () => [], querySelector: () => makeEl(),
      body: makeEl("body"), addEventListener() {}
    }
  };
  sandbox.window = sandbox; sandbox.scrollTo = () => {}; sandbox.window.scrollTo = sandbox.scrollTo;
  vm.createContext(sandbox);
  for (const s of scripts) vm.runInContext(s, sandbox, { filename: "app.js" });
  sandbox.__ok = ok;
  vm.runInContext('function check(n,c){ __ok(!!c,n); }', sandbox);
  return sandbox;
}
function run(sb, code, label) {
  try { vm.runInContext(code, sb, { filename: label }); }
  catch (e) { ok(false, label + " threw: " + (e && e.message)); }
}

/* ================= Phase A — English, fresh ================= */
const storeA = {};
let A;
try { A = boot(storeA); ok(true, "A: scripts load without error"); }
catch (e) { ok(false, "A: scripts load without error (" + e.message + ")"); }

if (A) run(A, `
/* --- Step 0 title fix: titles now match bodies --- */
var PAIR = {
 "lab-45": { t: /DHCP Server and IP Pool Management/, s: /DHCP/ },
 "lab-46": { t: /Simple Queues: Setting Bandwidth Plans/, s: /simple queue/i },
 "lab-47": { t: /NAT and Firewall/, s: /NAT/ },
 "lab-49": { t: /Hotspot Setup/, s: /hotspot/i },
 "lab-50": { t: /Monitoring and Backup/, s: /backup/i }
};
Object.keys(PAIR).forEach(function(id){
  var l = labById(id);
  check("A title "+id+" matches body topic", PAIR[id].t.test(l.title) && PAIR[id].s.test(LAB_CONTENT[id].scenario));
});
check("A: lab-45 title no longer says Queues", !/Queue/.test(labById("lab-45").title));
check("A: lab-50 title no longer says Suspending", !/Suspend/.test(labById("lab-50").title));
check("A: 50 labs listed", LABS.length === 50);

/* --- All 50 labs completable end-to-end (EN) --- */
var labFail = [];
LABS.forEach(function(l){
  try {
    openLab(l.id);
    var ct = LAB_CONTENT[l.id];
    ct.check.forEach(function(q, i){ pickAnswer(i, q.a); });
    runCheck();
    if (!(labState && labState.passed)) { labFail.push(l.id + ":check"); return; }
    completeLab();
    if (!save.done[l.id]) labFail.push(l.id + ":done");
  } catch (e) { labFail.push(l.id + ":" + e.message); }
});
check("A: all 50 labs completable EN" + (labFail.length ? " [" + labFail.join(",") + "]" : ""), labFail.length === 0);
check("A: doneCount() === 50", doneCount() === 50);
check("A: progress 100%", progressPct() === 100);

/* --- Quizzes: perfect run per category --- */
var qFail = [];
CATS.forEach(function(c){
  try {
    openQuiz(c.id);
    var q = quizQuestions(c.id);
    if (!q || q.length !== 10) { qFail.push(c.id + ":n=" + (q && q.length)); return; }
    q.forEach(function(qq, i){ quizPick(i, qq.a); });
    quizSubmit();
    if (!(save.quiz[c.id] && save.quiz[c.id].best === 10)) qFail.push(c.id + ":best");
  } catch (e) { qFail.push(c.id + ":" + e.message); }
});
check("A: all 6 quizzes perfect-run save best=10" + (qFail.length ? " [" + qFail.join(",") + "]" : ""), qFail.length === 0);

/* --- Tickets: all 9 resolved --- */
var tFail = [];
TICKETS.forEach(function(t){
  try {
    openTicket(t.id);
    t.steps.forEach(function(s){ tkPick(s.a); tkNext(); });
    if (!save.tickets[t.id]) tFail.push(t.id);
  } catch (e) { tFail.push(t.id + ":" + e.message); }
});
check("A: all 9 tickets resolve" + (tFail.length ? " [" + tFail.join(",") + "]" : ""), tFail.length === 0);

/* --- Mock test: perfect run --- */
openMock(); startMock();
check("A: mock has 30 questions", MOCK_QS && MOCK_QS.length === 30);
MOCK_QS.forEach(function(q, i){ mockPick(i, q.a); });
submitMock();
check("A: mock perfect run saves mockBest=30", save.mockBest === 30);

/* --- Tools math (research worked examples) --- */
var exA = pbCalc({ km: 10, wl: 1550, splices: 6, spliceDb: 0.1, conns: 4, ratio: "1:32", margin: 3, tx: 3 });
check("A: power budget ex A total = 25.3 dB", exA.total === 25.3);
check("A: power budget ex A PASS B+", exA.passB === true);
check("A: power budget ex A Rx = -22.3 dBm", exA.rx === -22.3);
var exB = pbCalc({ km: 10, wl: 1550, splices: 6, spliceDb: 0.1, conns: 4, ratio: "1:64", margin: 3, tx: 3 });
check("A: 1:64 total = 29.3 dB, fails B+ passes C+", exB.total === 29.3 && exB.passB === false && exB.passC === true);
check("A: splitter design 1:32 = 16.5, 1:64 = 20.5", splitDesign("1:32") === 16.5 && splitDesign("1:64") === 20.5);
var mono = true, prev = -1;
SPLIT_TABLE.forEach(function(r){ if (!(r[3] > prev)) mono = false; prev = r[3]; });
check("A: splitter table design loss strictly increases with split", mono && SPLIT_TABLE.length >= 6);
check("A: dB converter 0dBm=1mW, 10dBm=10mW, 100mW=20dBm", dbmToMw(0) === 1 && dbmToMw(10) === 10 && Math.abs(mwToDbm(100) - 20) < 1e-9);
document.getElementById("t-km").value = "10"; document.getElementById("t-wl").value = "1550";
document.getElementById("t-sp").value = "6"; document.getElementById("t-spdb").value = "0.1";
document.getElementById("t-cn").value = "4"; document.getElementById("t-ratio").value = "1:32";
document.getElementById("t-margin").value = "3"; document.getElementById("t-tx").value = "3";
pbRun();
var pbHtml = document.getElementById("t-pb-out").innerHTML;
check("A: pbRun renders 25.3 + PASS verdict", pbHtml.indexOf("25.3") >= 0 && pbHtml.indexOf("PASS") >= 0);

/* --- Builder verdicts --- */
bPreset("gpon");
var r1 = bRun();
check("A: builder GPON preset yields verdicts", r1 && r1.verdicts && r1.verdicts.length > 0);
bPreset("mt"); B.change = "firewall"; B.fw = "all";
var r2 = bRun();
check("A: builder block-all on own path = LOCKOUT RISK", r2.lockouts.length >= 1);
B.fw = "mgmt";
check("A: builder mgmt-subnet rule = LOCKOUT RISK", bRun().lockouts.length >= 1);
B.fw = "3389";
var r4 = bRun();
check("A: builder port-3389 rule = no lockout + ok verdict", r4.lockouts.length === 0 && r4.verdicts.some(function(v){ return v.cls === "ok"; }));
B.change = "vlan"; B.vlan = "mismatch";
var r5 = bRun();
check("A: builder VLAN mismatch = blocking verdict", r5.verdicts.some(function(v){ return v.cls === "no" && /VLAN/.test(v.t); }));

/* --- Certificate --- */
openCert();
document.getElementById("cert-name").value = "Test Student";
certIssue();
check("A: certificate issued with RHU-FIB id", !!(save.cert && /^RHU-FIB-\\d{8}-[0-9A-Z]{1,6}$/.test(save.cert.id)));
var doc = save.cert ? certDocHTML(save.cert) : "";
check("A: cert doc has name + course + Instagram + Valid until",
  doc.indexOf("Test Student") >= 0 && doc.indexOf("Fiber &amp; ISP Labs") >= 0 &&
  doc.indexOf("Instagram: i.huwaris") >= 0 && doc.indexOf("Valid until") >= 0);

/* --- Interview --- */
check("A: interview has 20 Q&As", INT_QA.length === 20);
openInterview();
check("A: interview renders", document.getElementById("view-interview").innerHTML.length > 1500);
`, "phaseA");

/* ================= Phase B — persistence ================= */
let B;
try { B = boot(storeA); ok(true, "B: scripts reload with saved store"); }
catch (e) { ok(false, "B: scripts reload with saved store (" + e.message + ")"); }
if (B) run(B, `
check("B: progress persists — doneCount 50", doneCount() === 50);
check("B: cert persists", !!(save.cert && save.cert.name === "Test Student"));
check("B: mockBest persists = 30", save.mockBest === 30);
check("B: 6 quiz bests persist", Object.keys(save.quiz).length === 6);
check("B: 9 tickets persist", Object.keys(save.tickets).length === 9);
`, "phaseB");

/* ================= Phase C — Urdu, fresh ================= */
const storeC = {};
let C;
try { C = boot(storeC); ok(true, "C: scripts load without error"); }
catch (e) { ok(false, "C: scripts load without error (" + e.message + ")"); }
if (C) run(C, `
setLang("ur");
check("C: language persists under fiber-labs-lang-v1", localStorage.getItem("fiber-labs-lang-v1") === "ur");
var URT = { "lab-45": "DHCP Server aur IP Pool Management", "lab-46": "Simple Queues: Bandwidth Plans Set Karna",
  "lab-47": "NAT aur Firewall: Node ki Hifazat", "lab-49": "Hotspot Setup: Portal, Profiles aur Vouchers",
  "lab-50": "Monitoring aur Backup: Live Node ki Nigrani" };
Object.keys(URT).forEach(function(id){
  check("C: UR title " + id, labTitle(labById(id)) === URT[id]);
});
goHome();
check("C: UR home shows no notice text", document.getElementById("view-home").innerHTML.indexOf("tayyar ho raha hai") < 0);
var labFail = [];
LABS.forEach(function(l){
  try {
    openLab(l.id);
    var h = document.getElementById("view-lab").innerHTML;
    if (h.indexOf("tayyar ho raha hai") >= 0) { labFail.push(l.id + ":notice"); return; }
    var ct = LAB_CONTENT[l.id];
    ct.check.forEach(function(q, i){ pickAnswer(i, q.a); });
    runCheck();
    if (!(labState && labState.passed)) { labFail.push(l.id + ":check"); return; }
    completeLab();
    if (!save.done[l.id]) labFail.push(l.id + ":done");
  } catch (e) { labFail.push(l.id + ":" + e.message); }
});
check("C: all 50 labs completable UR, zero notices" + (labFail.length ? " [" + labFail.join(",") + "]" : ""), labFail.length === 0);
openQuiz("mikrotik");
var mq = quizQuestions("mikrotik");
mq.forEach(function(qq, i){ quizPick(i, qq.a); });
quizSubmit();
check("C: UR mikrotik quiz perfect saves best=10", !!(save.quiz.mikrotik && save.quiz.mikrotik.best === 10));
openTicket("t1");
var t1 = TICKETS[0];
tkSteps(t1).forEach(function(s){ tkPick(s.a); tkNext(); });
check("C: UR ticket t1 resolves", !!save.tickets.t1);
setLang("en");
openLab("lab-45");
var h45 = document.getElementById("view-lab").innerHTML;
check("C: EN round-trip restores lab-45 English body", h45.indexOf("plain Ethernet service") >= 0);
goHome();
check("C: EN home after round-trip has no Urdu markers", !/(karein|mukammal|tarjuma)/.test(document.getElementById("view-home").innerHTML));
`, "phaseC");

console.log("DAY4 VERIFY: PASS " + PASS + " / FAIL " + FAIL);
if (fails.length) console.log("FAILURES:\n - " + fails.join("\n - "));
process.exit(FAIL ? 1 : 0);
