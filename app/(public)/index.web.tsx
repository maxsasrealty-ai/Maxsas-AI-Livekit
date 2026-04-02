import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// ── FONTS AND GLOBAL CSS ────────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

const globalStyles = `
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(79,140,255,0.2)} 50%{box-shadow:0 0 50px rgba(79,140,255,0.4),0 0 80px rgba(0,208,132,0.15)} }
  @keyframes fade-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  .fade-up { animation: fade-up 0.7s ease both; }
  .fade-up-1 { animation-delay: 0.1s; }
  .fade-up-2 { animation-delay: 0.25s; }
  .fade-up-3 { animation-delay: 0.4s; }
  .fade-up-4 { animation-delay: 0.55s; }

  .hover-card { transition: transform 0.3s, border-color 0.3s; }
  .hover-card:hover { transform: translateY(-4px); border-color: rgba(79,140,255,0.35); }
`;

// ── COLOR PALETTE ───────────────────────────────────────────────────────────
const C = {
  bg: "#040c18",
  bgDeep: "#06122a",
  card: "#0d1f38",
  cardDark: "#0a1628",
  blue: "#4F8CFF",
  green: "#00D084",
  textPrimary: "#e8edf5",
  textMuted: "rgba(232,237,245,0.65)",
  textFaint: "rgba(232,237,245,0.40)",
  white: "#ffffff",
};

// ── SHARED COMPONENTS ───────────────────────────────────────────────────────
const AnimatedOrb = ({ size, color, duration, delay, reverse }: any) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration, delay, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay, duration]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, reverse ? 40 : -40],
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ translateY }],
          filter: 'blur(40px)', // Web specific blur
        } as any,
      ]}
    />
  );
};

// Call Card visual identical to login for hero context
const BlinkingDot = () => {
  const op = useRef(new Animated.Value(0.2)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(op, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(op, { toValue: 0.2, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.green, opacity: op, boxShadow: `0 0 10px ${C.green}` } as any} />;
};

const AnimatedWavebars = () => {
  const bars = [12, 24, 16, 32, 22, 14, 28, 18, 10, 26];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, height: 32 }}>
      {bars.map((h, i) => (
        <View key={i} style={{ width: 4, height: h, backgroundColor: i < 5 ? C.blue : C.green, borderRadius: 2, opacity: 0.8 }} />
      ))}
      <Text style={{ color: C.textMuted, fontSize: 13, marginLeft: 8, fontWeight: '600' }}>02:14</Text>
    </View>
  );
};

const TRANSCRIPTS = [
  [{ speaker: '🤖', text: 'Connecting to lead...', color: C.blue }],
  [
    { speaker: '🤖', text: 'Connecting to lead...', color: C.blue },
    { speaker: '👤', text: "Yes I'm looking for 3BHK", color: C.white },
  ],
  [
    { speaker: '🤖', text: 'Connecting to lead...', color: C.blue },
    { speaker: '👤', text: "Yes I'm looking for 3BHK", color: C.white },
    { speaker: '🤖', text: 'Budget around ₹80L?', color: C.blue },
  ]
];

const HeroCallCard = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true })
    ])).start();
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 0, duration: 2000, useNativeDriver: true })
    ])).start();
    const inv = setInterval(() => setTIdx((p) => (p + 1) % TRANSCRIPTS.length), 3000);
    return () => clearInterval(inv);
  }, []);

  const cardTranslateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -15] });
  const ringScale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const ringOp = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.4] });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 420 }}>
        {/* Glow Ring */}
      <Animated.View style={{
        position: 'absolute', width: 440, height: 500, borderRadius: 24,
        borderWidth: 1, borderColor: 'rgba(79,140,255,0.2)', opacity: ringOp,
        transform: [{ scale: ringScale }, { translateY: cardTranslateY }]
      }} />
      <Animated.View style={{
        width: 400, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 24,
        transform: [{ translateY: cardTranslateY }],
        boxShadow: `0 0 60px rgba(79,140,255,0.1)`,
        backgroundColor: '#0a1220'
      } as any}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <BlinkingDot />
            <Text style={{ color: C.green, fontSize: 13, fontWeight: '700', letterSpacing: 1 }}>AI AGENT CALLING...</Text>
          </View>
          <AnimatedWavebars />
        </View>

        <View style={{ backgroundColor: 'transparent', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>LEAD</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '700', marginTop: 4 }}>Rahul Sharma</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>BUDGET</Text>
              <Text style={{ fontSize: 15, color: C.blue, fontWeight: '700', marginTop: 4 }}>INR 80 Lakhs</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>LOCATION</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '700', marginTop: 4 }}>Whitefield</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>TYPE</Text>
              <Text style={{ fontSize: 15, color: C.white, fontWeight: '700', marginTop: 4 }}>3BHK</Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 10, color: C.textFaint, fontWeight: '700', letterSpacing: 1, marginBottom: 8 }}>LIVE TRANSCRIPT</Text>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)', minHeight: 90, marginBottom: 20 }}>
          {TRANSCRIPTS[tIdx].map((msg, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
              <Text style={{ fontSize: 13, color: msg.speaker === '🤖' ? C.textFaint : C.textMuted }}>{msg.speaker === '🤖' ? 'AI' : 'Lead'}</Text>
              <Text style={{ fontSize: 13, color: msg.color, fontWeight: '400' }}>{msg.text}</Text>
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: 'transparent', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,208,132,0.15)' }}>
          <Text style={{ fontSize: 10, color: C.green, fontWeight: '800', letterSpacing: 1, marginBottom: 8 }}>AI QUALIFICATION SUMMARY</Text>
          {['Buyer interested in 3BHK', 'Budget confirmed: INR 80L', 'Site visit suggested'].map((b,i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 6, marginBottom: 2, alignItems: 'center' }}>
              <Text style={{ color: C.textMuted, fontSize: 16 }}>+</Text>
              <Text style={{ color: C.textPrimary, fontSize: 13 }}>{b}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255, 107, 107, 0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 107, 107, 0.2)' }}>
            <Text style={{ fontSize: 12, color: '#ff6b6b', fontWeight: '600' }}>Hot Lead</Text>
          </View>
          <Text style={{ fontSize: 11, color: C.textFaint }}>Follow-up in 24 hrs</Text>
        </View>
      </Animated.View>
    </View>
  );
};

// ── MARQUEE COMPONENT ───────────────────────────────────────────────────────
const MarqueeLogos = () => {
  const pan = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(pan, { toValue: -800, duration: 15000, useNativeDriver: true })
    ).start();
  }, [pan]);

  const brands = ['Lodha Group', 'Prestige Estates', 'DLF Limited', 'Godrej Prop', 'Sobha Ltd'];
  const items = [...brands, ...brands]; // double up for infinite scrolling

  return (
    <View style={{ overflow: 'hidden', width: '100%' }}>
      <Animated.View style={{ flexDirection: 'row', width: 1600, transform: [{ translateX: pan }] }}>
        {items.map((brand, i) => (
          <View key={i} style={{ width: 160, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: C.white, fontSize: 22, fontWeight: '800', fontFamily: 'serif' }}>{brand}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

// ── INTERACTIVE DEMO COMPONENT ──────────────────────────────────────────────
const InteractiveDemo = () => {
  const [step, setStep] = useState(0);
  const transcript = [
    { p: 'ai', t: "Hi, is this Anubhav? I'm calling from Maxsas Realty regarding your inquiry on 99acres." },
    { p: 'user', t: "Yes, I'm looking for a premium 3BHK." },
    { p: 'ai', t: "Great! Our premium 3BHKs in Sector 62 start at ₹3.5Cr. Does that fit your budget?" },
    { p: 'user', t: "Yes, that works. Can we schedule a site visit for this weekend?" },
    { p: 'ai', t: "Absolutely! I've booked your site visit for Saturday at 11 AM. A confirmation text is on its way." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s < transcript.length - 1 ? s + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ width: '100%', maxWidth: 800, alignSelf: 'center', backgroundColor: '#0a1628', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(79,140,255,0.2)', padding: 32, backgroundImage: 'linear-gradient(145deg,rgba(13,31,56,0.8),rgba(10,22,40,0.9))' as any, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' } as any}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(232,237,245,0.05)', paddingBottom: 16 }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ff5f56' }} />
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ffbd2e' }} />
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#27c93f' }} />
        <Text style={{ marginLeft: 12, fontFamily: "'Inter', sans-serif", color: 'rgba(232,237,245,0.5)', fontSize: 13, letterSpacing: 1 }}>LIVE CALL TRANSCRIPT</Text>
      </View>

      <View style={{ gap: 16, minHeight: 280 }}>
        {transcript.map((line, idx) => (
          <View key={idx} style={{ opacity: idx <= step ? 1 : 0, transform: [{ translateY: idx <= step ? 0 : 10 }], transition: 'all 0.5s ease', flexDirection: 'row', gap: 16, alignItems: 'flex-start' } as any}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: line.p === 'ai' ? 'rgba(79,140,255,0.1)' : 'rgba(0,208,132,0.1)', justifyContent: 'center', alignItems: 'center', marginTop: 2, borderWidth: 1, borderColor: line.p === 'ai' ? 'rgba(79,140,255,0.2)' : 'rgba(0,208,132,0.2)' }}>
              <Text style={{ fontSize: 14 }}>{line.p === 'ai' ? '🤖' : '👤'}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: line.p === 'ai' ? 'transparent' : 'rgba(255,255,255,0.03)', padding: line.p === 'ai' ? 0 : 16, borderRadius: line.p === 'ai' ? 0 : 12, paddingTop: line.p === 'ai' ? 8 : 16 }}>
              <Text style={{ fontFamily: "'Inter', sans-serif", color: line.p === 'ai' ? C.white : 'rgba(232,237,245,0.8)', fontSize: 15, lineHeight: 24 }}>{line.t}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// ── LANDING PAGE COMPONENT ──────────────────────────────────────────────────
export default function LandingScreen() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#050914' }}>
      <FontInjector />
      <style>{globalStyles}</style>

      <StatusBar barStyle="light-content" backgroundColor="#050914" />
      {/* GLOBAL BACKGROUND GRID */}
      <View style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' } as any} />

      {/* NAVBAR */}
      <View style={{
        position: 'fixed' as any, top: 0, left: 0, right: 0, zIndex: 100, height: 72,
        backgroundColor: scrolled ? 'rgba(5,9,20,0.85)' : 'transparent',
        borderBottomWidth: scrolled ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.05)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40
      } as any}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', width: 280 }}>
          <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.green, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: '800', color: '#050914' }}>AI</Text>
          </View>
          <Text style={{ color: C.white, fontSize: 20, fontWeight: '900', letterSpacing: -1 }}>Maxsas Realty AI</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 32, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' })}>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: C.textPrimary, fontSize: 14, fontWeight: '500' }}>Platform</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: C.textPrimary, fontSize: 14, fontWeight: '500' }}>Solutions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: C.textPrimary, fontSize: 14, fontWeight: '500' }}>Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: C.textPrimary, fontSize: 14, fontWeight: '500' }}>Demo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: C.textPrimary, fontSize: 14, fontWeight: '500' }}>Login</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ width: 200, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => router.push('/signup')} style={{ backgroundColor: C.blue, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}>
            <Text style={{ color: C.white, fontSize: 13, fontWeight: '700' }}>Start Free Trial</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setScrolled(e.nativeEvent.contentOffset.y > 50)}
        scrollEventThrottle={16}
      >
        {/* === HERO SECTION === */}
        <View style={{ width: '100%', maxWidth: 1240, alignSelf: 'center', minHeight: 700, flexDirection: 'row', alignItems: 'center', marginTop: 80, paddingHorizontal: 40, paddingVertical: 60 }}>
          {/* BG */}
          <View style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 20% 40%,rgba(79,140,255,0.12) 0%,transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%,rgba(0,208,132,0.08) 0%,transparent 55%)' } as any} />
          
          <View style={{ flex: 1, paddingRight: 60, zIndex: 10, maxWidth: 700 }}>
            
            {/* Outline Pill */}
            <View className="fade-up fade-up-1" style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgba(79,140,255,0.1)', alignSelf: 'flex-start', borderRadius: 100, borderWidth: 1, borderColor: 'rgba(79,140,255,0.25)', marginBottom: 28 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.green }} />
              <Text style={{ color: 'rgba(232,237,245,0.8)', fontSize: 13, fontWeight: '500', fontFamily: "'Inter', sans-serif" }}>AI-Powered Real Estate Calling</Text>
            </View>

            {/* Fluid Inline Text Layout */}
            <h1 className="fade-up fade-up-2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: '800', lineHeight: 1.12, letterSpacing: -1, marginBottom: 22, color: C.white, marginTop: 0 }}>
              Run AI Voice Agents That <span style={{ backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Qualify Real Estate Leads</span> Automatically
            </h1>

            <Text className="fade-up fade-up-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.5vw, 18px)' as any, color: "rgba(232,237,245,0.65)", lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
              Maxsas Realty AI calls your property leads, understands buyer intent, and delivers qualified prospects directly to your sales team — on autopilot.
            </Text>

            <View className="fade-up fade-up-4" style={{ flexDirection: 'row', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <TouchableOpacity onPress={() => router.push('/signup')} style={{ backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundImage: 'linear-gradient(135deg,#4F8CFF,#2563eb)' } as any}>
                <Text style={{ fontFamily: "'Inter', sans-serif", color: C.white, fontSize: 15, fontWeight: '700' }}>▶ Start AI Demo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'transparent', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(232,237,245,0.2)' }}>
                <Text style={{ fontFamily: "'Inter', sans-serif", color: C.textPrimary, fontSize: 15, fontWeight: '600' }}>See How It Works</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/login')} style={{ marginLeft: 8 }}>
                <Text style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(232,237,245,0.45)', fontSize: 13, fontWeight: '600' }}>Login &rarr;</Text>
              </TouchableOpacity>
            </View>
            
            {/* Stats Row injected to Hero */}
            <View className="fade-up" style={{ flexDirection: 'row', gap: 32, marginTop: 48, paddingTop: 32, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', animationDelay: '0.7s' as any }}>
              {[
                { v: "10x", l: "Faster Lead Qualification" },
                { v: "87%", l: "Conversion Accuracy" },
                { v: "24/7", l: "Automated Calling" },
              ].map(({ v, l }) => (
                <View key={v}>
                  <Text style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: '800', backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' } as any}>{v}</Text>
                  <Text style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(232,237,245,0.45)", marginTop: 2 }}>{l}</Text>
                </View>
              ))}
            </View>
            
          </View>

          <View className="fade-up fade-up-4" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             {/* Floating ambient glow tied via keyframes */}
            <View style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: 150, background: "radial-gradient(circle,rgba(79,140,255,0.07),transparent 70%)", animation: "float 7s ease-in-out infinite" } as any} />
            <View style={{ position: "absolute", bottom: "15%", right: "5%", width: 200, height: 200, borderRadius: 100, background: "radial-gradient(circle,rgba(0,208,132,0.07),transparent 70%)", animation: "float 9s ease-in-out infinite reverse" } as any} />
             
            <HeroCallCard />
          </View>
        </View>

        {/* === TRUST STRIP === */}
        <View style={{ width: '100%', paddingVertical: 40, borderTopWidth: 1, borderTopColor: 'rgba(79,140,255,0.1)', backgroundColor: 'rgba(79,140,255,0.02)', borderBottomWidth: 1, borderBottomColor: 'rgba(79,140,255,0.1)' }}>
          <Text style={{ fontFamily: "'Outfit', sans-serif", textAlign: 'center', color: "rgba(232,237,245,0.35)", fontSize: 13, fontWeight: '700', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32 }}>
            Trusted by modern Real Estate Teams
          </Text>
          <View style={{ opacity: 0.8 }}>
            <MarqueeLogos />
          </View>
        </View>

        {/* === FEATURES GRID === */}
        <View nativeID="platform" style={{ width: '100%', maxWidth: 1240, alignSelf: 'center', paddingVertical: 120, paddingHorizontal: 40 }}>
          <View style={{ alignItems: 'center', marginBottom: 64 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'rgba(79,140,255,0.1)', borderWidth: 1, borderColor: 'rgba(79,140,255,0.2)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 16, alignSelf: 'center' }}>
              <Text style={{ color: '#4F8CFF', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>Platform Features</Text>
            </View>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: '800', textAlign: 'center', marginBottom: 20, color: C.white, marginTop: 0 }}>
              Everything You Need to <span style={{ backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Close More Deals</span>
            </h2>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.55)", fontSize: 16, textAlign: 'center', maxWidth: 600, alignSelf: 'center' }}>
              One AI platform that handles calling, qualification, follow-ups, and analytics.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {[
              { i: '📞', t: 'AI Voice Calling', d: 'Automatically dial and speak to incoming leads with human-like latency and accent.' },
              { i: '🧠', t: 'Lead Qualification AI', d: 'Intelligently parses budget, location, and intent constraints natively during the call.' },
              { i: '📋', t: 'Batch Calling', d: 'Upload massive CSV lists and dial hundreds of leads concurrently.' },
              { i: '🔁', t: 'Follow-up Automation', d: 'AI schedules and executes callbacks when leads ask for more time.' },
              { i: '📊', t: 'Real-time Analytics', d: 'Track conversion metrics, minutes used, and overall campaign health instantly.' },
              { i: '🔗', t: 'CRM Integration', d: 'Seamlessly connects with Salesforce, HubSpot, Zoho CRM, and custom systems via API.' },
            ].map((f, i) => (
              <View key={i} className="hover-card" style={{ width: 'calc(33.3% - 16px)' as any, backgroundImage: 'linear-gradient(145deg,rgba(13,31,56,0.8),rgba(10,22,40,0.9))' as any, padding: 32, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(79,140,255,0.12)' } as any}>
                <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(79,140,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                  <Text style={{ fontSize: 24 }}>{f.i}</Text>
                </View>
                <Text style={{ fontFamily: "'Outfit', sans-serif", color: C.white, fontSize: 18, fontWeight: '700', marginBottom: 12 }}>{f.t}</Text>
                <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.55)", fontSize: 14.5, lineHeight: 24 }}>{f.d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* === HOW IT WORKS === */}
        <View nativeID="how-it-works" style={{ backgroundColor: 'transparent', paddingVertical: 120, position: 'relative' }}>
          <View style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(79,140,255,0.04) 0%, transparent 65%)' } as any} />
          <View style={{ width: '100%', maxWidth: 1240, alignSelf: 'center', paddingHorizontal: 40, position: 'relative', zIndex: 1 }}>
            
            <View style={{ alignItems: 'center', marginBottom: 64 }}>
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,208,132,0.1)', borderWidth: 1, borderColor: 'rgba(0,208,132,0.2)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 16, alignSelf: 'center' }}>
                <Text style={{ color: '#00D084', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>How It Works</Text>
              </View>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: '800', textAlign: 'center', color: C.white, marginTop: 0, marginBottom: 0 }}>
                From Lead to Qualified Buyer in <span style={{ color: '#00D084' }}>3 Steps</span>
              </h2>
            </View>

            <View style={{ flexDirection: 'row', gap: 32, justifyContent: 'space-between' }}>
              {[
                { s: '1', i: '📤', t: 'Upload Leads', d: 'Import property inquiries from portals like 99acres or your CRM.' },
                { s: '2', i: '🤖', t: 'AI Calls Leads', d: 'Your AI agent makes natural calls, asking the right qualifying questions.' },
                { s: '3', i: '🎯', t: 'Get Qualified Buyers', d: 'Your sales team receives only high-intent, pre-qualified prospects.' },
              ].map((step, idx) => (
                <View key={idx} style={{ flex: 1, position: 'relative' }}>
                  {idx < 2 && (
                    <Text style={{ position: 'absolute', top: 40, right: -25, fontSize: 24, color: 'rgba(79,140,255,0.3)', zIndex: 2, fontWeight: '300' }}>&rarr;</Text>
                  )}
                  <View style={{ flex: 1, padding: 32, backgroundImage: 'linear-gradient(145deg,#0d1f38,#0a1628)' as any, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(79,140,255,0.15)', alignItems: 'center' }}>
                    <Text style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: '700', color: '#4F8CFF', letterSpacing: 3, marginBottom: 20, textAlign: 'center' }}>STEP 0{step.s}</Text>
                    <View style={{ width: 72, height: 72, borderRadius: 36, backgroundImage: 'linear-gradient(135deg,rgba(79,140,255,0.15),rgba(0,208,132,0.1))' as any, borderWidth: 1, borderColor: 'rgba(79,140,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                      <Text style={{ fontSize: 32 }}>{step.i}</Text>
                    </View>
                    <Text style={{ fontFamily: "'Outfit', sans-serif", color: C.white, fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' }}>{step.t}</Text>
                    <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.55)", fontSize: 15, lineHeight: 24, textAlign: 'center' }}>{step.d}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* === LIVE DEMO TERMINAL === */}
        <View style={{ paddingVertical: 120, alignItems: 'center', paddingHorizontal: 40, position: 'relative' }}>
          <View style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,208,132,0.04) 0%, transparent 60%)' } as any} />
          <View style={{ alignItems: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'rgba(79,140,255,0.1)', borderWidth: 1, borderColor: 'rgba(79,140,255,0.2)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 16, alignSelf: 'center' }}>
              <Text style={{ color: '#4F8CFF', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>Live AI Demo</Text>
            </View>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: '800', textAlign: 'center', marginBottom: 12, color: C.white, margin: 0 }}>
              Listen to the <span style={{ backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>AI in Action</span>
            </h2>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.5)", fontSize: 16, textAlign: 'center', maxWidth: 600 }}>
              Watch how our voice AI agent naturally converses, qualifies the buyer, and books a site visit entirely autonomously.
            </Text>
          </View>

          <InteractiveDemo />
        </View>


        {/* === PRICING === */}
        <View nativeID="pricing" style={{ width: '100%', paddingVertical: 120, backgroundImage: 'linear-gradient(180deg,#040c18,#06122a)' as any }}>
          <View style={{ maxWidth: 1100, alignSelf: 'center', paddingHorizontal: 40, width: '100%' }}>
            
            <View style={{ alignItems: 'center', marginBottom: 64 }}>
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(79,140,255,0.1)', borderWidth: 1, borderColor: 'rgba(79,140,255,0.2)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 16, alignSelf: 'center' }}>
                <Text style={{ color: '#4F8CFF', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>Pricing</Text>
              </View>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: '800', textAlign: 'center', marginBottom: 12, color: C.white, marginTop: 0 }}>
                Simple, Transparent <span style={{ backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Pricing</span>
              </h2>
              <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.5)", fontSize: 16, textAlign: 'center' }}>
                Start free. Scale as your business grows.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
              {[
                { n: 'Basic', em: '🌱', p: '₹4,999', f: ['Up to 500 AI calls/month', 'Lead qualification scoring', 'Basic transcripts', '1 AI agent voice'], c: 'rgba(79,140,255,0.1)', b: 'rgba(79,140,255,0.2)' },
                { n: 'Diamond', em: '💎', p: '₹12,999', tg: 'Most Popular', f: ['Up to 3,000 AI calls/month', 'Advanced lead qualification AI', 'Full conversation transcripts', 'Auto CRM integration', 'Priority support + onboarding'], pop: true, c: 'rgba(79,140,255,0.15)', b: '#4F8CFF' },
                { n: 'Enterprise', em: '🏢', p: 'Custom', f: ['Unlimited AI calls', 'Dedicated account manager', 'White-label option', 'Custom CRM & API connection'], c: 'rgba(0,208,132,0.05)', b: 'rgba(0,208,132,0.25)' },
              ].map((tier, i) => (
                <View key={i} style={{ flex: 1, maxWidth: 350, backgroundImage: `linear-gradient(145deg,${tier.c},rgba(10,22,40,0.9))` as any, padding: 32, borderRadius: 20, borderWidth: 1, borderColor: tier.b, transform: [{ scale: tier.pop ? 1.03 : 1 }], boxShadow: tier.pop ? '0 0 40px rgba(79,140,255,0.15)' : 'none' } as any}>
                  {tier.pop && (
                    <View style={{ position: 'absolute', top: -14, alignSelf: 'center', backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)' as any, paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20 }}>
                      <Text style={{ color: C.white, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>★ {tier.tg}</Text>
                    </View>
                  )}
                  <Text style={{ fontSize: 28, marginBottom: 12 }}>{tier.em}</Text>
                  <Text style={{ fontFamily: "'Outfit', sans-serif", color: C.white, fontSize: 20, fontWeight: '800', marginBottom: 4 }}>{tier.n}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 24, gap: 4 }}>
                    <Text style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: '800', backgroundImage: tier.pop ? 'linear-gradient(90deg,#4F8CFF,#00D084)' : 'none', WebkitBackgroundClip: tier.pop ? 'text' : 'unset', WebkitTextFillColor: tier.pop ? 'transparent' : 'inherit', color: tier.pop ? 'transparent' : C.white } as any}>{tier.p}</Text>
                    {tier.p !== 'Custom' && <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.4)", fontSize: 13 }}>/ month</Text>}
                  </View>

                  <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 20 }} />

                  <View style={{ gap: 10, marginBottom: 32 }}>
                    {tier.f.map(feat => (
                      <View key={feat} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text style={{ color: C.green, fontSize: 14 }}>✓</Text>
                        <Text style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(232,237,245,0.75)', fontSize: 13.5 }}>{feat}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <TouchableOpacity onPress={() => router.push('/signup')} style={{ backgroundColor: tier.pop ? '#2563eb' : 'transparent', paddingVertical: 13, borderRadius: 10, alignItems: 'center', borderWidth: tier.pop ? 0 : 1, borderColor: 'rgba(79,140,255,0.3)', backgroundImage: tier.pop ? 'linear-gradient(135deg,#4F8CFF,#2563eb)' : 'none', boxShadow: tier.pop ? '0 0 25px rgba(79,140,255,0.3)' : 'none' } as any}>
                    <Text style={{ fontFamily: "'Inter', sans-serif", color: tier.pop ? C.white : 'rgba(232,237,245,0.8)', fontSize: 15, fontWeight: '700' }}>
                      {tier.n === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* === FINAL CTA === */}
        <View style={{ paddingVertical: 120, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <View style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(79,140,255,0.1),transparent 70%)' } as any} />
          <View style={{ position: 'relative', zIndex: 1, maxWidth: 700, alignItems: 'center', paddingHorizontal: 40 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", color: C.white, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: '800', textAlign: 'center', lineHeight: 1.15, marginBottom: 20, marginTop: 0 }}>
              Start Automating Your <span style={{ backgroundImage: 'linear-gradient(90deg,#4F8CFF,#00D084)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Real Estate Calls</span> Today
            </h2>
            
            <Text style={{ fontFamily: "'Inter', sans-serif", color: "rgba(232,237,245,0.55)", fontSize: 18, textAlign: 'center', marginBottom: 40, lineHeight: 1.6 }}>
              Join hundreds of real estate teams using Maxsas Realty AI to qualify leads faster, close more deals, and never miss a buyer again.
            </Text>

            <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => router.push('/login')} style={{ backgroundColor: '#2563eb', paddingHorizontal: 36, paddingVertical: 16, borderRadius: 12, backgroundImage: 'linear-gradient(135deg,#4F8CFF,#2563eb)', boxShadow: '0 0 40px rgba(79,140,255,0.4)' } as any}>
                <Text style={{ fontFamily: "'Inter', sans-serif", color: C.white, fontSize: 16, fontWeight: '700' }}>🚀 Launch AI Agent</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'transparent', paddingHorizontal: 36, paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(232,237,245,0.2)' }}>
                <Text style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(232,237,245,0.8)', fontSize: 16, fontWeight: '600' }}>Talk to Sales</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(232,237,245,0.3)', fontSize: 13, marginTop: 20 }}>No credit card required • Free 14-day trial • Cancel anytime</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={{ paddingVertical: 40, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', gap: 16 }}>
           <View style={{ flexDirection: 'row', gap: 24, marginBottom: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
             <TouchableOpacity onPress={() => router.push('/privacy')}><Text style={{ color: C.textMuted, fontSize: 14, fontWeight: '500' }}>Privacy Policy</Text></TouchableOpacity>
             <TouchableOpacity onPress={() => router.push('/refund')}><Text style={{ color: C.textMuted, fontSize: 14, fontWeight: '500' }}>Refund Policy</Text></TouchableOpacity>
             <TouchableOpacity onPress={() => router.push('/terms')}><Text style={{ color: C.textMuted, fontSize: 14, fontWeight: '500' }}>Terms & Conditions</Text></TouchableOpacity>
           </View>
           <Text style={{ color: C.textFaint, fontSize: 14 }}>© 2026 Maxsas Realty AI. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}
