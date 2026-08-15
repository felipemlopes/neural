"use client";

import Sparkline from "../_components/charts/Sparkline";
import LineChart from "../_components/charts/LineChart";
import { kpis, forexData, transactions, statusColor } from "../_components/data/mockData";
import { dashboardSparks } from "../_components/data/sparkSets";
import useViewport from "../_hooks/useViewport";

function KpiCard({
  kpi,
  spark,
  isMobile,
}: {
  kpi: (typeof kpis)[number];
  spark: number[];
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        background: "#0a0e14",
        border: "1px solid rgba(0,212,232,0.12)",
        borderRadius: 6,
        padding: isMobile ? 14 : 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: kpi.up ? "linear-gradient(90deg,#00d4e8,transparent)" : "linear-gradient(90deg,#e84040,transparent)",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: 2,
              color: "#3d5060",
              fontFamily: "var(--font-display)",
              marginBottom: 4,
            }}
          >
            {kpi.label.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: isMobile ? 18 : 26,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-display)",
              letterSpacing: 1,
            }}
          >
            {kpi.value}
          </div>
        </div>
        {!isMobile && <Sparkline values={spark} color={kpi.up ? "#00d4e8" : "#e84040"} />}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: kpi.up ? "#00d4e8" : "#e84040", fontSize: 12, fontWeight: 600 }}>{kpi.delta}</span>
        <span style={{ color: "#3d5060", fontSize: 10 }}>{kpi.sub}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isMobile, isTablet } = useViewport();
  const kpiCols = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)";
  const txns = transactions.slice(0, 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 3, height: 16, background: "#00d4e8", borderRadius: 2 }} />
        </div>
        <h1
          style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: 2,
            color: "#fff",
          }}
        >
          DASHBOARD
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: kpiCols, gap: 12 }}>
        {kpis.map((k, i) => (
          <KpiCard key={i} kpi={k} spark={dashboardSparks[i]} isMobile={isMobile} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 320px", gap: 16 }}>
        <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#3d5060",
                  fontFamily: "var(--font-display)",
                }}
              >
                VOLUME MENSAL
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  color: "#fff",
                }}
              >
                R$ 2.847.390
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 2, background: "#00d4e8", borderRadius: 1 }} />
                Forex
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 2, background: "#00aaff", borderRadius: 1 }} />
                Cripto
              </div>
            </div>
          </div>
          <LineChart />
        </div>

        {!isMobile && !isTablet && (
          <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20 }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: "#3d5060",
                fontFamily: "var(--font-display)",
                marginBottom: 14,
              }}
            >
              PARES FOREX — AO VIVO
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {forexData.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(0,212,232,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#c0cdd8",
                    }}
                  >
                    {f.pair}
                  </span>
                  <span style={{ fontSize: 12, color: "#5a7a8a" }}>{f.bid}</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "var(--font-display)",
                      color: f.up ? "#00d4e8" : "#e84040",
                      letterSpacing: 1,
                    }}
                  >
                    {f.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(0,212,232,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: 2,
              color: "#3d5060",
              fontFamily: "var(--font-display)",
            }}
          >
            TRANSAÇÕES RECENTES
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#00d4e8",
              cursor: "pointer",
              letterSpacing: 1,
              fontFamily: "var(--font-display)",
            }}
          >
            VER TUDO →
          </span>
        </div>

        {!isMobile && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 80px 100px 90px",
              gap: 12,
              padding: "8px 16px",
              borderBottom: "1px solid rgba(0,212,232,0.06)",
            }}
          >
            {["ID", "USUÁRIO", "TIPO", "VALOR", "STATUS"].map((h, i) => (
              <span
                key={i}
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: "#3d5060",
                  fontFamily: "var(--font-display)",
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {txns.map((t, i) =>
          isMobile ? (
            <div
              key={i}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(0,212,232,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#c0cdd8", fontWeight: 500, marginBottom: 2 }}>{t.user}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#3d5060",
                    letterSpacing: 1,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t.id}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf2" }}>{t.valor}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: statusColor(t.status),
                    fontFamily: "var(--font-display)",
                    letterSpacing: 1,
                    marginTop: 2,
                  }}
                >
                  {t.status}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 80px 100px 90px",
                gap: 12,
                padding: "10px 16px",
                borderBottom: "1px solid rgba(0,212,232,0.06)",
                fontSize: 12,
                alignItems: "center",
              }}
            >
              <span style={{ color: "#3d5060", fontFamily: "var(--font-display)", letterSpacing: 1 }}>
                {t.id}
              </span>
              <span style={{ color: "#c0cdd8" }}>{t.user}</span>
              <span style={{ color: "#5a7a8a" }}>{t.tipo}</span>
              <span style={{ color: "#e8edf2", fontWeight: 600 }}>{t.valor}</span>
              <span
                style={{
                  color: statusColor(t.status),
                  fontFamily: "var(--font-display)",
                  letterSpacing: 1,
                  fontSize: 11,
                }}
              >
                {t.status}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}