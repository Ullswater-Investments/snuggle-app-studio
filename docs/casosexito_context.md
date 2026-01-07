# ProcureData - Contexto Maestro de Casos de Éxito

> **Versión:** 2.0  
> **Total de Casos:** 47  
> **Simuladores Premium Implementados:** 11  
> **Sectores:** Industrial, Agroalimentario, Movilidad, Salud, Economía Social, Comercio, Tecnología, Finanzas, Energía, Circular, Agri-Tech  
> **Última actualización:** 2026-01-07  
> **Propósito:** Fuente única de verdad para sincronización entre ARIA, páginas de simulación, gráficos interactivos y componentes premium

---

## Changelog de Actualizaciones v2.0

| Fecha | Cambio | Descripción |
|-------|--------|-------------|
| 2026-01-07 | Blueprint 2.0 | Nuevo estándar visual de 2 columnas (7/12 + 5/12) |
| 2026-01-07 | 11 Simuladores Premium | RawMarket, VinosDO, Helios, Aeolus, GridFlex, FiberLoop, Avocado, Berry, PortBCN, BioMed, SocialHub |
| 2026-01-07 | Panel ARIA Dinámico | Insights contextuales con variables interpoladas |
| 2026-01-07 | Hash Pontus-X | Verificación blockchain en cada simulador |
| 2026-01-07 | Lógica Matemática | Fórmulas JavaScript extraídas y documentadas |
| 2026-01-07 | Paletas Sectoriales | Colores actualizados por simulador |

---

## Índice por Sector

### Industrial (4 casos)
1. [gigafactory-north](#caso-01-gigafactory-north)
2. [sky-aero-systems](#caso-02-sky-aero-systems)
3. [purelithium-sourcing](#caso-03-purelithium-sourcing)
4. [fastfashion-trace](#caso-04-fastfashion-trace)

### Agroalimentario (2 casos)
5. [olivetrust-coop](#caso-05-olivetrust-coop)
6. [vinosdoe-elite](#caso-06-vinosdoe-elite) ⭐ **Simulador Premium**

### Movilidad (2 casos)
7. [urbandeliver-bcn](#caso-07-urbandeliver-bcn)
8. [portbcn-smart-trade](#caso-08-portbcn-smart-trade) ⭐ **Simulador Premium**

### Salud (2 casos)
9. [biomed-hospital](#caso-09-biomed-hospital) ⭐ **Simulador Premium**
10. [pharmacold-logistix](#caso-10-pharmacold-logistix)

### Economía Social (2 casos)
11. [alianza-social-hub](#caso-11-alianza-social-hub) ⭐ **Simulador Premium**
12. [ayuntamiento-etico](#caso-12-ayuntamiento-etico)

### Comercio (2 casos)
13. [globalretail-prime](#caso-13-globalretail-prime)
14. [invoicetrust-b2b](#caso-14-invoicetrust-b2b)

### Tecnología (1 caso)
15. [datacloud-secure](#caso-15-datacloud-secure)

### Finanzas (1 caso)
16. [greenfinance-esg](#caso-16-greenfinance-esg)

### Transporte (1 caso)
17. [fleetcarbon-zero](#caso-17-fleetcarbon-zero)

### Energía (10 casos)
18. [helios-fields](#caso-18-helios-fields) ⭐ **Simulador Premium**
19. [aeolus-wind](#caso-19-aeolus-wind) ⭐ **Simulador Premium**
20. [h2-pure](#caso-20-h2-pure)
21. [poligono-ecolink](#caso-21-poligono-ecolink)
22. [gridflex-demand](#caso-22-gridflex-demand) ⭐ **Simulador Premium**
23. [bateria-hub](#caso-23-bateria-hub)
24. [bioheat-district](#caso-24-bioheat-district)
25. [turbine-chain](#caso-25-turbine-chain)
26. [aquapower-nexus](#caso-26-aquapower-nexus)
27. [smartcharge-ev](#caso-27-smartcharge-ev)

### Economía Circular (10 casos)
28. [fiber-loop](#caso-28-fiber-loop) ⭐ **Simulador Premium**
29. [rare-earth-recover](#caso-29-rare-earth-recover)
30. [alu-cycle](#caso-30-alu-cycle)
31. [producer-trust](#caso-31-producer-trust)
32. [eco-orchestrator](#caso-32-eco-orchestrator)
33. [raw-market](#caso-33-raw-market) ⭐ **Simulador Premium (Blueprint 2.0)**
34. [battery-life](#caso-34-battery-life)
35. [urban-mining](#caso-35-urban-mining)
36. [waste-to-value](#caso-36-waste-to-value)
37. [green-gov-circular](#caso-37-green-gov-circular)

### Agri-Tech (10 casos)
38. [avocado-trust](#caso-38-avocado-trust) ⭐ **Simulador Premium**
39. [olive-origin](#caso-39-olive-origin)
40. [zero-chem-wine](#caso-40-zero-chem-wine)
41. [citrus-check](#caso-41-citrus-check)
42. [berry-water](#caso-42-berry-water) ⭐ **Simulador Premium**
43. [rice-satellite](#caso-43-rice-satellite)
44. [bio-cotton-trace](#caso-44-bio-cotton-trace)
45. [greenhouse-ai](#caso-45-greenhouse-ai)
46. [tropical-flash](#caso-46-tropical-flash)
47. [urban-hydro](#caso-47-urban-hydro)

---

# BLUEPRINT 2.0: ESTÁNDAR VISUAL DE SIMULADORES

## Arquitectura de Componentes

El Blueprint 2.0 define un estándar visual de 2 columnas para todos los simuladores premium:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SIMULADOR PREMIUM v2.0                           │
├────────────────────────────────────────┬────────────────────────────┤
│          COLUMNA IZQUIERDA (7/12)      │  COLUMNA DERECHA (5/12)    │
│  ┌──────────────────────────────────┐  │  ┌────────────────────────┐│
│  │ Header: Badge Sector + Hash TX  │  │  │ Avatar ARIA + Rol      ││
│  └──────────────────────────────────┘  │  └────────────────────────┘│
│  ┌──────────────────────────────────┐  │  ┌────────────────────────┐│
│  │ Visualización Dinámica/Gráfico  │  │  │ Insight Dinámico #1    ││
│  │ (Recharts: Bar, Area, Line...)  │  │  │ con variables          ││
│  └──────────────────────────────────┘  │  └────────────────────────┘│
│  ┌──────────────────────────────────┐  │  ┌────────────────────────┐│
│  │ Slider 1: Variable Principal    │  │  │ Insight Dinámico #2    ││
│  │ Slider 2: Variable Secundaria   │  │  │ con variables          ││
│  └──────────────────────────────────┘  │  └────────────────────────┘│
│  ┌──────────────────────────────────┐  │  ┌────────────────────────┐│
│  │ KPI Grid (2-3 columnas)         │  │  │ Recomendación Premium  ││
│  │ [Métrica 1] [Métrica 2] [...]   │  │  │ (condicional)          ││
│  └──────────────────────────────────┘  │  └────────────────────────┘│
│  ┌──────────────────────────────────┐  │  ┌────────────────────────┐│
│  │ RESULTADO PRINCIPAL             │  │  │ CTA: Descargar PDF     ││
│  │ XXXX,XXX EUROe                  │  │  │ Hash verificación      ││
│  └──────────────────────────────────┘  │  └────────────────────────┘│
└────────────────────────────────────────┴────────────────────────────┘
```

## Estructura JSX/TSX Estándar

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  {/* Columna Izquierda: Simulación (7/12) */}
  <Card className="lg:col-span-7 bg-gradient-to-br from-{sector}-950/40 to-slate-950/50 border-{sector}-500/20 shadow-[0_0_50px_-12px_rgba({rgb},0.15)] rounded-3xl overflow-hidden">
    <CardHeader>
      <Badge>Sector + Hash Pontus-X</Badge>
      <CardTitle>NOMBRE SIMULADOR</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Sliders + Gráficos + KPIs + Resultado */}
    </CardContent>
  </Card>

  {/* Columna Derecha: Panel ARIA (5/12) */}
  <Card className="lg:col-span-5 bg-[#020617] border-{sector}-500/20 shadow-xl rounded-3xl overflow-hidden">
    <CardContent className="p-6 flex flex-col h-full">
      {/* Header ARIA */}
      {/* Insights Dinámicos */}
      {/* Footer con CTA */}
    </CardContent>
  </Card>
</div>
```

## Patrón de Hash de Verificación Pontus-X

```javascript
const txHash = useMemo(() => 
  `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`, 
  [sliderValue1, sliderValue2]
);
```

---

# TABLA DE SIMULADORES IMPLEMENTADOS

| Caso ID | Componente | Sector | Gráfico Principal | Paleta | Estado |
|---------|------------|--------|-------------------|--------|--------|
| raw-market | `RawMarketSimulator` | Circular | BarChart horizontal | Emerald | Blueprint 2.0 ✅ |
| vinosdoe-elite | `VinosDOSimulator` | Agro | Mapa trazabilidad | Rose/Amber | v1.0 |
| helios-fields | `HeliosFieldsSimulator` | Energía | AreaChart + Grid | Yellow | v1.0 |
| aeolus-wind | `AeolusWindSimulator` | Energía | Turbina animada | Cyan | v1.0 |
| gridflex-demand | `GridFlexSimulator` | Energía | BarChart carga | Purple | v1.0 |
| fiber-loop | `FiberLoopSimulator` | Circular | Flujo Sankey | Emerald/Violet | v1.0 |
| avocado-trust | `AvocadoTrustSimulator` | Agri-Tech | Grid sensores IoT | Emerald/Lime | v1.0 |
| berry-water | `BerryWaterSimulator` | Agri-Tech | AreaChart humedad | Blue/Lime | v1.0 |
| portbcn-smart-trade | `PortBCNSimulator` | Movilidad | Progress bars | Cyan/Blue | v1.0 |
| biomed-hospital | `BioMedSimulator` | Salud | Heartbeat monitor | Rose | v1.0 |
| alianza-social-hub | `SocialHubSimulator` | Social | SROI multiplier | Violet/Purple | v1.0 |

---

# TABLA DE VARIABLES DE SLIDERS

| Variable | Rango | Unidad | Default | Casos |
|----------|-------|--------|---------|-------|
| `wasteVolume` | 100-10000 | kg | 2000 | raw-market |
| `purityLevel` | 80-100 | % | 95 | raw-market |
| `exportedLots` | 1000-100000 | botellas | 10000 | vinosdoe-elite |
| `fraudRisk` | 0-15 | % | 8 | vinosdoe-elite |
| `numPanels` | 1000-50000 | unidades | 10000 | helios-fields |
| `dirtyDays` | 1-60 | días | 15 | helios-fields |
| `windSpeed` | 3-25 | m/s | 12 | aeolus-wind |
| `fixedPrice` | 30-90 | €/MWh | 55 | aeolus-wind |
| `reductionCapacity` | 50-5000 | kW | 1000 | gridflex-demand |
| `incentivePrice` | 100-500 | €/MWh | 250 | gridflex-demand |
| `tonsCollected` | 10-5000 | toneladas | 1000 | fiber-loop |
| `shreddingEfficiency` | 50-98 | % | 85 | fiber-loop |
| `sensorDensity` | 1-10 | sensores/ha | 5 | avocado-trust |
| `hectares` | 10-500 | hectáreas | 100 | avocado-trust |
| `numProbes` | 1-20 | sondas | 8 | berry-water |
| `teuVolume` | 100-5000 | TEUs | 1500 | portbcn-smart-trade |
| `digitalEfficiency` | 0-100 | % | 80 | portbcn-smart-trade |
| `numDevices` | 5-100 | equipos | 20 | biomed-hospital |
| `predictivePower` | 0-100 | % | 75 | biomed-hospital |
| `ethicalSpend` | 10000-1000000 | € | 100000 | alianza-social-hub |
| `insertionRate` | 1-50 | % | 15 | alianza-social-hub |

---

# TABLA DE PALETAS DE COLOR POR SIMULADOR

| Simulador | Primario | Secundario | Glow Shadow | Panel ARIA |
|-----------|----------|------------|-------------|------------|
| RawMarket | `#059669` | `#10B981` | `rgba(16,185,129,0.15)` | `#020617` |
| VinosDO | `#7F1D1D` | `#D4AF37` | `rgba(217,119,6,0.15)` | `#020617` |
| Helios | `#FACC15` | `#F59E0B` | `rgba(250,204,21,0.15)` | `#020617` |
| Aeolus | `#22D3EE` | `#0E7490` | `rgba(34,211,238,0.15)` | `#020617` |
| GridFlex | `#A855F7` | `#6366F1` | `rgba(168,85,247,0.15)` | `#020617` |
| FiberLoop | `#059669` | `#8B5CF6` | `rgba(16,185,129,0.15)` | `#020617` |
| Avocado | `#065F46` | `#84CC16` | `rgba(6,95,70,0.15)` | `#020617` |
| BerryWater | `#3B82F6` | `#84CC16` | `rgba(59,130,246,0.15)` | `#020617` |
| PortBCN | `#0369A1` | `#22D3EE` | `rgba(3,105,161,0.15)` | `#020617` |
| BioMed | `#EF4444` | `#FFFFFF` | `rgba(239,68,68,0.15)` | `#020617` |
| SocialHub | `#A855F7` | `#4F46E5` | `rgba(168,85,247,0.15)` | `#020617` |

---

# LÓGICA MATEMÁTICA POR SIMULADOR

## Simulador: RawMarketSimulator (Blueprint 2.0)

**Archivo:** `src/components/success-stories/simulators/RawMarketSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Volumen de Merma | `wasteVolume` | 100-10000 kg | 100 | 2000 |
| Pureza del Material | `purityLevel` | 80-100% | 1 | 95 |

### Lógica JavaScript

```javascript
const basePrice = 1.2; // €/kg
const income = wasteVolume * (basePrice * (purityLevel / 100));
const landfillSavings = wasteVolume * 0.15;
const premiumPercent = Math.round((purityLevel - 80) * 1.1);
const cycleDays = Math.max(1, Math.round(15 - (purityLevel - 80) * 0.65));
const buyersInterested = Math.min(25, Math.round(8 + (purityLevel - 80) * 0.85));
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Valoración Marketplace | `income` | `X,XXX EUROe` |
| Premium vs Chatarra | `premiumPercent` | `+XX%` |
| Días para Cierre | `cycleDays` | `X días` |
| Compradores Interesados | `buyersInterested` | `X compradores` |
| Ahorro Vertedero | `landfillSavings` | `X EUROe` |

### Gráfico Recharts
```javascript
const chartData = [
  { name: 'Tradicional', value: 15, fill: '#64748b' },
  { name: 'ProcureData', value: results.cycleDays, fill: '#10b981' }
];
// BarChart layout="vertical" barSize={20}
```

### ARIA Insights Dinámicos
```markdown
Insight 1: "Con **{wasteVolume} kg** de merma certificada al **{purityLevel}%** de pureza, 
tu lote genera **{income} EUROe** de ingresos directos."

Insight 2: "Evitas **{landfillSavings} EUROe** en tasas de vertedero. Tu material ya no es 
residuo; es **materia prima secundaria certificada**."

Insight 3: "Ciclo de venta reducido de **15 días** a solo **{cycleDays} días**. 
Hay **{buyersInterested} compradores** interesados en tu lote."

Condicional (purityLevel > 90): "El nivel de pureza del **{purityLevel}%** te califica para 
el sello **Quality Assured**. Recomiendo publicar en el marketplace premium."
```

---

## Simulador: VinosDOSimulator

**Archivo:** `src/components/success-stories/simulators/VinosDOSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Botellas Exportadas | `exportedLots` | 1000-100000 | 1000 | 10000 |
| Riesgo de Fraude | `fraudRisk` | 0-15% | 1 | 8 |

### Lógica JavaScript

```javascript
const pricePerBottle = 62; // EUROe
const savedRevenue = exportedLots * pricePerBottle * (fraudRisk / 100);
const brandEquityBoost = savedRevenue * 0.38;
const totalImpact = savedRevenue + brandEquityBoost;
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Revenue Protegido | `savedRevenue` | `X,XXX EUROe` |
| Boost de Marca +38% | `brandEquityBoost` | `X,XXX EUROe` |
| Impacto Total | `totalImpact` | `X,XXX EUROe` |

### Visual Especial
- Mapa de trazabilidad: España (Ribera del Duero) → Shanghai
- Arco de conexión animado con punto pulsante
- Badge NFC_SCAN en el centro
- Status: BLOCKCHAIN: VERIFIED_ON_CHAIN

---

## Simulador: HeliosFieldsSimulator

**Archivo:** `src/components/success-stories/simulators/HeliosFieldsSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Número de Paneles | `numPanels` | 1000-50000 | 1000 | 10000 |
| Días sin Limpieza | `dirtyDays` | 1-60 | 1 | 15 |

### Lógica JavaScript

```javascript
const efficiencyLoss = dirtyDays * 0.002;
const mwhRecovered = numPanels * 0.015 * (1 - efficiencyLoss);
const revenueGain = mwhRecovered * 52; // €/MWh

// Production curve data
const productionData = [
  { hour: '06:00', mwh: 0 },
  { hour: '09:00', mwh: mwhRecovered * 0.4 },
  { hour: '12:00', mwh: mwhRecovered },
  { hour: '15:00', mwh: mwhRecovered * 0.8 },
  { hour: '18:00', mwh: mwhRecovered * 0.3 },
  { hour: '21:00', mwh: 0 },
];

// Dirt level for visual grid
const dirtLevel = Math.min(dirtyDays / 60, 1);
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Generación Real-Time | `mwhRecovered` | `XX.X MWh` |
| Ingresos Diarios | `revenueGain` | `X,XXX EUROe/día` |
| Eficiencia | `+5%` | Badge fijo |

### Visual Especial
- Grid de 40 paneles (10x4) con estados: limpio (yellow-500) / sucio (slate-600)
- AreaChart con gradiente solar para producción diaria
- Alerta "Limpieza Urgente" cuando dirtyDays > 30

---

## Simulador: AeolusWindSimulator

**Archivo:** `src/components/success-stories/simulators/AeolusWindSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Velocidad del Viento | `windSpeed` | 3-25 m/s | 1 | 12 |
| Precio PPA Pactado | `fixedPrice` | 30-90 €/MWh | 5 | 55 |

### Lógica JavaScript

```javascript
const instantPayout = windSpeed * 1.5 * fixedPrice;
const cashFlowBoost = instantPayout * 0.15;

// Turbine rotation speed based on wind
const rotationDuration = Math.max(0.5, 5 - (windSpeed / 5));
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Generación | `windSpeed * 1.5` | `XX.X MWh` |
| Pago en Bloque | `instantPayout` | `X,XXX EUROe` |
| Mejora Flujo de Caja | `cashFlowBoost` | `+X,XXX EUROe` |

### Visual Especial
- Icono Wind con animación spin dinámica (duration = rotationDuration)
- Líneas de viento animadas (5 líneas horizontales)
- Comparativa: Tradicional 45 días vs Smart Contract 2 seg
- TX_HASH: 0x1c2d...wind_settle

---

## Simulador: GridFlexSimulator

**Archivo:** `src/components/success-stories/simulators/GridFlexSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Capacidad de Reducción | `reductionCapacity` | 50-5000 kW | 50 | 1000 |
| Precio Incentivo | `incentivePrice` | 100-500 €/MWh | 25 | 250 |

### Lógica JavaScript

```javascript
const monthlyIncentive = (reductionCapacity / 1000) * incentivePrice * 4;
const gridReliability = Math.min(100, 85 + (reductionCapacity / 500));

const loadData = [
  { name: 'Base', load: 100 },
  { name: 'Reducción', load: 100 - (reductionCapacity / 50) }
];
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| kW Reducción | `reductionCapacity` | `X,XXX kW` |
| €/MWh Incentivo | `incentivePrice` | `XXX €/MWh` |
| Eventos/Mes | `4` | Fijo |
| Estabilidad Grid | `gridReliability` | `XX%` |
| Incentivos Mensuales | `monthlyIncentive` | `X,XXX EUROe` |

### Gráfico Recharts
```javascript
// BarChart horizontal layout="vertical"
// Cell colors: index 0 = '#6b7280', index 1 = '#a855f7'
```

---

## Simulador: FiberLoopSimulator

**Archivo:** `src/components/success-stories/simulators/FiberLoopSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Toneladas Recogidas | `tonsCollected` | 10-5000 t | 50 | 1000 |
| Eficiencia de Desfibrado | `shreddingEfficiency` | 50-98% | 1 | 85 |

### Lógica JavaScript

```javascript
const netFiber = tonsCollected * (shreddingEfficiency / 100);
const taxSaving = tonsCollected * 0.45 * 1000; // €/ton
const revenueBoost = tonsCollected * 1.75 * 1000; // Premium 75%
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Fibra Neta | `netFiber` | `X,XXX t` |
| Impuestos Evitados | `taxSaving` | `X,XXX EUROe` |
| Index Circularidad | `A+` | Badge fijo |
| Valor Fibra (+75% Premium) | `revenueBoost` | `X,XXX EUROe` |

### Visual Especial
- Flujo de transformación: Icono Factory (Post-Consumo) → Arrow → Leaf (Fibra Neta)
- Barra de progreso con gradiente slate → emerald → violet
- Eficiencia % en el centro

---

## Simulador: AvocadoTrustSimulator

**Archivo:** `src/components/success-stories/simulators/AvocadoTrustSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Densidad Sensores | `sensorDensity` | 1-10 sensores/ha | 1 | 5 |
| Hectáreas Monitorizadas | `hectares` | 10-500 ha | 10 | 100 |

### Lógica JavaScript

```javascript
const savingsPerLot = 1200; // €/lote
const annualSavings = hectares * savingsPerLot * (sensorDensity / 10);
const rejectionRisk = (3.5 * (1 - (sensorDensity / 10))).toFixed(2);

// Sensor grid (20 nodes)
const sensorGrid = Array.from({ length: 20 }, (_, i) => ({
  active: i < Math.floor(sensorDensity * 2),
  pest: false
}));
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Sensores/Ha | `sensorDensity` | `X` |
| Hectáreas | `hectares` | `XXX` |
| Riesgo Rechazo | `rejectionRisk` | `X.XX%` |
| Ahorro Anual | `annualSavings` | `X,XXX EUROe` |

### Visual Especial
- Grid 5x4 de sensores con estados: activo (emerald-500 pulsante) / inactivo (slate-800)
- Status bar: 100% PEST_FREE_ZONE
- Comparativa despacho USDA: Tradicional 5 días vs IoT 4 horas

---

## Simulador: BerryWaterSimulator

**Archivo:** `src/components/success-stories/simulators/BerryWaterSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Sondas de Humedad | `numProbes` | 1-20 | 1 | 8 |
| Hectáreas Monitorizadas | `hectares` | 5-200 ha | 5 | 50 |

### Lógica JavaScript

```javascript
const waterPerHectare = 1560; // m3/ha baseline
const waterSaved = hectares * waterPerHectare * (numProbes / 10) * 0.3; // 30% reduction
const efficiencyIndex = 72 + (numProbes * 1.3);

// Moisture data simulation
const moistureData = [
  { week: 'S1', level: 100 },
  { week: 'S2', level: 70 },
  { week: 'S3', level: 100 },
  { week: 'S4', level: 60 },
];
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Eficiencia Riego | `efficiencyIndex` | `XX%` |
| Sondas/Ha | `numProbes` | `XX` |
| Ahorro de Agua Anual | `waterSaved` | `X,XXX m³` |

### Visual Especial
- Gauge de humedad: Barra gradiente amber → emerald → blue
- AreaChart con datos de humedad semanal
- Badge GlobalG.A.P. Audit: PASSED - Digital

---

## Simulador: PortBCNSimulator

**Archivo:** `src/components/success-stories/simulators/PortBCNSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Volumen Mensual (TEUs) | `teuVolume` | 100-5000 | 100 | 1500 |
| Eficiencia Digital | `digitalEfficiency` | 0-100% | 5 | 80 |

### Lógica JavaScript

```javascript
const costPerTEU = 450; // €/TEU estancia
const costSaved = teuVolume * costPerTEU * (digitalEfficiency / 100);
const traditionalHours = 72;
const pdHours = 6;
const hoursSaved = traditionalHours - pdHours;
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| TEUs/mes | `teuVolume` | `X,XXX` |
| Eficiencia Digital | `digitalEfficiency` | `XX%` |
| Ahorro en Tasas Portuarias | `costSaved` | `X,XXX EUROe` |

### Visual Especial
- Barra de progreso de eficiencia con contenedor animado
- Indicadores de nivel (5 barras)
- Comparativa barras: Tradicional 72h vs ProcureData 6h
- Status: IDS_CHANNEL: ACTIVE

---

## Simulador: BioMedSimulator

**Archivo:** `src/components/success-stories/simulators/BioMedSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Equipos Médicos en Red | `numDevices` | 5-100 | 5 | 20 |
| Nivel Mantenimiento Predictivo | `predictivePower` | 0-100% | 5 | 75 |

### Lógica JavaScript

```javascript
const costPerDay = 15000; // €/día parada
const savedAmount = numDevices * costPerDay * (predictivePower / 100) * 0.4;
const humanHoursSaved = numDevices * 120;
const fteEquivalent = (humanHoursSaved / 1760).toFixed(1);
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Cobertura Predictivo | `predictivePower` | `XX%` |
| FTEs Liberados | `fteEquivalent` | `X.X` |
| Riesgo MDR | `0%` | Fijo |
| Ahorro en Paradas | `savedAmount` | `X,XXX EUROe` |

### Visual Especial
- Monitor de frecuencia cardíaca con SVG path animado
- Icono HeartPulse grande con badge Lock (GDPR)
- Status: MDR_STATUS: FULLY_COMPLIANT

---

## Simulador: SocialHubSimulator

**Archivo:** `src/components/success-stories/simulators/SocialHubSimulator.tsx`

### Sliders
| Slider | Variable | Rango | Step | Default |
|--------|----------|-------|------|---------|
| Inversión Ética Anual | `ethicalSpend` | 10000-1000000 € | 10000 | 100000 |
| Tasa de Inserción Laboral | `insertionRate` | 1-50% | 1 | 15 |

### Lógica JavaScript

```javascript
const sroiMultiplier = 3.8;
const socialValue = ethicalSpend * sroiMultiplier;
const publicSaving = ethicalSpend * 0.45;
const jobsCreated = Math.floor(ethicalSpend / 15000);
```

### KPIs Resultantes
| KPI | Fórmula | Formato |
|-----|---------|---------|
| Empleos Inclusivos | `jobsCreated` | `XX` |
| Ratio SROI | `1:3.8` | Fijo |
| Ética Verificada | `99%` | Fijo |
| Ahorro Público | `publicSaving` | `X,XXX EUROe` |
| Licitaciones | `+191%` | Fijo |
| Valor Social Total | `socialValue` | `X,XXX EUROe` |

### Visual Especial
- Multiplicador SROI visual: 1€ → TrendingUp → 3.8€
- Grid de impacto con iconos Users, TrendingUp, Building2
- Badge: Certificado Blockchain

---

# PALETAS DE COLOR POR SECTOR

| Sector | Primario | Secundario | Background | Text |
|--------|----------|------------|------------|------|
| Industrial | `#F97316` | `#FCD34D` | `bg-orange-50` | `text-orange-600` |
| Agroalimentario | `#22C55E` | `#86EFAC` | `bg-green-50` | `text-green-600` |
| Movilidad | `#3B82F6` | `#93C5FD` | `bg-blue-50` | `text-blue-600` |
| Salud | `#EF4444` | `#FCA5A5` | `bg-red-50` | `text-red-600` |
| Economía Social | `#A855F7` | `#D8B4FE` | `bg-purple-50` | `text-purple-600` |
| Comercio | `#14B8A6` | `#5EEAD4` | `bg-teal-50` | `text-teal-600` |
| Tecnología | `#6366F1` | `#A5B4FC` | `bg-indigo-50` | `text-indigo-600` |
| Finanzas | `#10B981` | `#6EE7B7` | `bg-emerald-50` | `text-emerald-600` |
| Transporte | `#6B7280` | `#D1D5DB` | `bg-gray-50` | `text-gray-600` |
| Energía | `#FACC15` | `#22D3EE` | `bg-yellow-50` | `text-yellow-600` |
| Circular | `#059669` | `#4F46E5` | `bg-emerald-50` | `text-emerald-600` |
| Agri-Tech | `#065F46` | `#84CC16` | `bg-lime-50` | `text-lime-700` |

---

# REGLAS ARIA (1-59)

## Reglas 1-10: Sector Industrial

```markdown
Regla: 1
ID: industrial_homologacion
Triggers: "homologación", "proveedor", "alta proveedor", "industrial", "certificación"
Respuesta: "ProcureData reduce el tiempo de homologación de proveedores de semanas a horas. 
GigaFactory North pasó de 22 días a 48 horas usando el Pasaporte Digital de Proveedor."
Link: /success-stories/gigafactory-north
Servicios: ["Pasaporte Digital de Proveedor", "Homologación Flash 24h", "Validador IATF"]
```

```markdown
Regla: 2
ID: aero_trazabilidad
Triggers: "aeronáutico", "AS9100", "EN 9120", "trazabilidad piezas", "aviación"
Respuesta: "La industria aeronáutica exige trazabilidad total. Sky Aero Systems 
logró 100% de trazabilidad con el Pasaporte Digital de Producto."
Link: /success-stories/sky-aero-systems
```

```markdown
Regla: 3
ID: lithium_esg
Triggers: "litio", "minerales críticos", "ESG minería", "conflicto minerales"
Respuesta: "PureLithium verificó el 100% de sus minas en tiempo real y atrajo €45M 
en inversión verde gracias al Verificador de Conflicto de Minerales."
Link: /success-stories/purelithium-sourcing
```

```markdown
Regla: 4
ID: fashion_social
Triggers: "moda", "textil", "condiciones laborales", "fábricas"
Respuesta: "FastFashion Trace monitoriza el 100% de sus fábricas en tiempo real. 
Los incidentes laborales bajaron un 91%."
Link: /success-stories/fastfashion-trace
```

## Reglas 11-20: Sector Agroalimentario

```markdown
Regla: 11
ID: agro_trazabilidad
Triggers: "aceite", "oliva", "trazabilidad alimentos", "D.O."
Respuesta: "OliveTrust Coop eliminó el fraude de mezcla con aceites importados. 
Cada botella incluye su trazabilidad GPS verificable."
Link: /success-stories/olivetrust-coop
```

```markdown
Regla: 12
ID: vino_falsificacion
Triggers: "vino", "falsificación", "NFC", "autenticidad"
Respuesta: "VinosDOE Elite bloqueó 847 botellas falsificadas en China con chips NFC-DID. 
Las ventas en Asia subieron un 28%."
Link: /success-stories/vinosdoe-elite
```

## Reglas 21-30: Sector Movilidad y Logística

```markdown
Regla: 21
ID: mobility_carbon
Triggers: "última milla", "emisiones", "Scope 3", "carbono entregas"
Respuesta: "UrbanDeliver BCN genera certificados de CO2 automáticos por cada entrega. 
Ganaron 8 contratos nuevos por su diferencial sostenible."
Link: /success-stories/urbandeliver-bcn
```

```markdown
Regla: 22
ID: port_customs
Triggers: "puerto", "aduana", "contenedores", "despacho"
Respuesta: "PortBCN Smart Trade redujo el tiempo de despacho de 72h a 6h con 
pre-validación digital IDS. Procesan un 52% más de contenedores."
Link: /success-stories/portbcn-smart-trade
```

## Reglas 31-39: Sector Salud y Social

```markdown
Regla: 31
ID: health_mdr
Triggers: "hospital", "MDR", "equipos médicos", "EUDAMED"
Respuesta: "BioMed Hospital verifica automáticamente el 100% de productos contra EUDAMED. 
Han eliminado el riesgo de usar material no certificado."
Link: /success-stories/biomed-hospital
```

```markdown
Regla: 32
ID: health_coldchain
Triggers: "cadena de frío", "vacunas", "temperatura", "pharma"
Respuesta: "PharmaCold Logistix eliminó el 98% de pérdidas por rotura de frío. 
Los sensores IoT detectan desviaciones en 30 segundos."
Link: /success-stories/pharmacold-logistix
```

```markdown
Regla: 33
ID: social_sroi
Triggers: "SROI", "impacto social", "cooperativa", "inserción laboral"
Respuesta: "Alianza Social Hub demuestra que cada euro invertido genera €3.40 de retorno 
social verificable. Han triplicado sus contratos públicos."
Link: /success-stories/alianza-social-hub
```

```markdown
Regla: 34
ID: social_procurement
Triggers: "compra ética", "ayuntamiento", "cláusulas sociales"
Respuesta: "El Ayuntamiento de Ciudad Verde evalúa el 100% de proveedores en 30 segundos 
con el Ethical Procurement Score."
Link: /success-stories/ayuntamiento-etico
```

## Reglas 40-49: Sector Economía Circular

```markdown
Regla: 40
ID: circular_fiber
Triggers: "fibra reciclada", "textil circular", "RAP", "DPP"
Respuesta: "Fiber-Loop certifica contenido reciclado real con Pasaporte Digital de Producto. 
Evitaron €60.000 en multas por greenwashing."
Link: /success-stories/fiber-loop
```

```markdown
Regla: 41
ID: circular_rawmarket
Triggers: "merma", "materia prima secundaria", "residuo industrial", "chatarra"
Respuesta: "RawMaterial Market convierte mermas en ingresos. Con certificación de pureza 
al 95%, el ciclo de venta se reduce de 15 días a 2 días."
Link: /success-stories/raw-market
```

```markdown
Regla: 42
ID: circular_rare_earth
Triggers: "tierras raras", "reciclaje electrónico", "e-waste"
Respuesta: "Rare Earth Recover certifica la recuperación de materiales críticos desde 
residuos electrónicos. Cumplimiento total de la Ley de Residuos."
Link: /success-stories/rare-earth-recover
```

```markdown
Regla: 43
ID: circular_battery
Triggers: "baterías", "reciclaje baterías", "segunda vida"
Respuesta: "Battery-Life certifica el estado de salud de baterías para segunda vida. 
Valor residual aumentado un 45%."
Link: /success-stories/battery-life
```

```markdown
Regla: 44
ID: circular_urban_mining
Triggers: "minería urbana", "recuperación metales", "demolición"
Respuesta: "Urban Mining certifica metales recuperados de demoliciones urbanas con 
trazabilidad completa desde el edificio origen."
Link: /success-stories/urban-mining
```

```markdown
Regla: 45
ID: circular_waste_value
Triggers: "valorización residuos", "waste to value", "subproducto"
Respuesta: "Waste-to-Value convierte subproductos industriales en materias primas 
certificadas. Premium de hasta 75% sobre precio de residuo."
Link: /success-stories/waste-to-value
```

```markdown
Regla: 46
ID: circular_gov
Triggers: "compra pública circular", "green procurement", "administración"
Respuesta: "Green Gov Circular ayuda a administraciones a verificar contenido reciclado 
en sus compras. Cumplimiento de la Ley 7/2022."
Link: /success-stories/green-gov-circular
```

## Reglas 50-59: Sector Agri-Tech

```markdown
Regla: 50
ID: agritech_avocado
Triggers: "aguacate", "fitosanitario", "USDA", "exportación fruta"
Respuesta: "Avocado-Trust reduce el riesgo de rechazo en aduana del 3.5% al 0.01% con 
sensores IoT notarizados en blockchain. Despacho en 4 horas."
Link: /success-stories/avocado-trust
```

```markdown
Regla: 51
ID: agritech_olive
Triggers: "aceite origen", "catastro", "pureza geográfica"
Respuesta: "Olive-Origin certifica la pureza geográfica del aceite vinculando cada lote 
a las parcelas del Catastro mediante DIDs."
Link: /success-stories/olive-origin
```

```markdown
Regla: 52
ID: agritech_wine
Triggers: "viticultura ecológica", "cero químicos", "biológico"
Respuesta: "Zero-Chem Wine monitoriza la transición ecológica del viñedo con sensores 
de suelo. Índice de salud del suelo visible para compradores."
Link: /success-stories/zero-chem-wine
```

```markdown
Regla: 53
ID: agritech_berry
Triggers: "riego", "huella hídrica", "agua", "fresa", "GlobalGAP"
Respuesta: "Berry-Water optimiza el riego con sondas IoT. Ahorro del 30% en consumo de agua 
y auditorías GlobalG.A.P. 100% digitales."
Link: /success-stories/berry-water
```

```markdown
Regla: 54
ID: agritech_citrus
Triggers: "cítricos", "HLB", "greening", "cuarentena"
Respuesta: "Citrus-Check detecta HLB temprano con análisis de espectro foliar. 
Zonas libres de enfermedad certificadas para exportación premium."
Link: /success-stories/citrus-check
```

```markdown
Regla: 55
ID: agritech_rice
Triggers: "arroz", "satélite", "inundación", "arrozal"
Respuesta: "Rice-Satellite monitoriza arrozales vía satélite. Certificación de prácticas 
sostenibles para mercados asiáticos exigentes."
Link: /success-stories/rice-satellite
```

```markdown
Regla: 56
ID: agritech_cotton
Triggers: "algodón", "trazabilidad fibra", "BCI"
Respuesta: "Bio-Cotton-Trace certifica algodón orgánico desde la semilla hasta la prenda. 
Cumplimiento de estándares BCI y GOTS."
Link: /success-stories/bio-cotton-trace
```

```markdown
Regla: 57
ID: agritech_greenhouse
Triggers: "invernadero", "clima controlado", "agricultura vertical"
Respuesta: "Greenhouse-AI optimiza condiciones con sensores IoT y ML. Rendimiento +35% 
con certificación de condiciones de cultivo."
Link: /success-stories/greenhouse-ai
```

```markdown
Regla: 58
ID: agritech_tropical
Triggers: "tropical", "mango", "piña", "logística fría"
Respuesta: "Tropical-Flash certifica la cadena de frío para frutas tropicales. 
Merma reducida del 15% al 2%."
Link: /success-stories/tropical-flash
```

```markdown
Regla: 59
ID: agritech_hydro
Triggers: "hidropónico", "urbano", "vertical farming"
Respuesta: "Urban-Hydro certifica cultivos hidropónicos con trazabilidad completa 
de nutrientes y calidad de agua."
Link: /success-stories/urban-hydro
```

---

# SECTOR: INDUSTRIAL

---

## CASO-01: gigafactory-north

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `gigafactory-north` |
| Empresa | GigaFactory North |
| Sector | Industrial |
| Categoría UI | `industrial` |
| Ruta | `/success-stories/gigafactory-north` |
| Icono | `Factory` |

### Texto Estructurado

#### El Reto
Empresa de baterías con una cadena de suministro de más de 200 proveedores de materiales críticos (litio, cobalto, níquel). La homologación manual de cada proveedor consumía 22 días laborales y requería 4 departamentos diferentes. El crecimiento exponencial de la demanda hacía insostenible el proceso actual.

#### La Solución
Implementación del **Pasaporte Digital de Proveedor** combinado con el servicio de **Homologación Flash 24h**. Los certificados ISO, IATF y ESG se validan automáticamente contra los registros blockchain de los organismos certificadores. El flujo ODRL automatiza el 85% de las verificaciones recurrentes.

#### Hito Tecnológico
- **Blockchain**: Verificación de certificados contra registros inmutables
- **ODRL**: Políticas de acceso condicional para datos de proveedores
- **Edge Functions**: Validación automática 24/7

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Tiempo de alta | 22 días | 48 horas | -91% |
| Departamentos involucrados | 4 | 1 | -75% |
| Errores de validación | 15% | 0.5% | -97% |
| Coste por homologación | €2,400 | €180 | -92% |

### ARIA's Strategic Insight

> "He analizado tu cadena de suministro. Con el Pasaporte Digital de Proveedor, cada certificado ISO 9001 e IATF 16949 se verifica automáticamente contra el registro blockchain del organismo certificador. Esto reduce tu tiempo de homologación de 22 días a 48 horas, liberando al equipo de compras para negociación estratégica en lugar de validación documental."

### Configuración Gráfica

#### Tipo de Gráfico

| Propiedad | Valor |
|-----------|-------|
| Componente Recharts | `RadarChart` |
| Eje X | Categorías de certificación (ISO, IATF, ESG, Calidad, Ambiental) |
| Eje Y | Nivel de cumplimiento (0-100%) |

#### Datos del Gráfico

```json
[
  { "subject": "ISO 9001", "A": 100, "fullMark": 100 },
  { "subject": "IATF 16949", "A": 95, "fullMark": 100 },
  { "subject": "ESG Score", "A": 88, "fullMark": 100 },
  { "subject": "Calidad", "A": 92, "fullMark": 100 },
  { "subject": "Ambiental", "A": 85, "fullMark": 100 }
]
```

### Configuración de Simulación

#### Sliders (Entradas)

| Slider | Rango | Unidad | Variable | Valor Default |
|--------|-------|--------|----------|---------------|
| Nº de Proveedores | 10 - 500 | unidades | `numProviders` | 200 |
| Frecuencia de Renovación | 1 - 12 | meses | `renewalFreq` | 6 |
| Complejidad de Validación | 1 - 5 | nivel | `complexity` | 3 |

#### Lógica Matemática

```javascript
// Ahorro anual en horas de trabajo
const horasAhorradas = numProviders * (22 - 2) * (12 / renewalFreq);

// Ahorro económico (€150/hora de trabajo administrativo)
const ahorroEuros = horasAhorradas * 150;

// Reducción de tiempo porcentual
const reduccionTiempo = ((22 - 2) / 22) * 100; // 91%

// Índice de eficiencia (0-100)
const eficiencia = Math.min(100, (numProviders / 500) * 100 * (complexity / 5));
```

### Blockchain Proof

| Propiedad | Valor |
|-----------|-------|
| Hash | `0x8f3c7a2e1b9d4f6c8e2a1b3d5f7c9e0a2b4d6f8a` |
| Bloque | `#18,234,567` |
| Red | Pontus-X (Gaia-X) |

---

## CASO-02: sky-aero-systems

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `sky-aero-systems` |
| Empresa | Sky Aero Systems |
| Sector | Industrial |
| Categoría UI | `industrial` |
| Ruta | `/success-stories/sky-aero-systems` |
| Icono | `Plane` |

### Texto Estructurado

#### El Reto
Fabricante aeronáutico con requisitos de trazabilidad AS9100 y EN 9120. Cada pieza crítica (tornillos de titanio, aleaciones especiales) requiere documentación de origen que se perdía frecuentemente en la cadena de subcontratistas.

#### La Solución
Implementación del **Pasaporte Digital de Producto** con trazabilidad completa desde la fundición hasta el ensamblaje final. Cada componente tiene un DID único que registra su historia completa en blockchain.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Piezas con trazabilidad completa | 45% | 100% | +122% |
| Tiempo de auditoría | 5 días | 4 horas | -97% |
| Rechazos por documentación | 8% | 0.1% | -99% |
| Coste de no conformidad | €180,000/año | €3,200/año | -98% |

### ARIA's Strategic Insight

> "En aeronáutica, la trazabilidad no es opcional, es regulación. Con el Pasaporte Digital de Producto, cada tornillo de titanio tiene un DID que registra su fundición, tratamiento térmico y certificados de lote. Sky Aero Systems ahora pasa auditorías AS9100 en 4 horas en lugar de 5 días."

---

# SECTOR: AGROALIMENTARIO

---

## CASO-05: olivetrust-coop

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `olivetrust-coop` |
| Empresa | OliveTrust Coop |
| Sector | Agroalimentario |
| Categoría UI | `agro` |
| Ruta | `/success-stories/olivetrust-coop` |
| Icono | `Leaf` |

### Texto Estructurado

#### El Reto
Cooperativa de aceite de oliva virgen extra con 450 agricultores. El fraude de mezcla con aceites de importación estaba dañando la reputación de la D.O. Los consumidores no podían verificar el origen real del producto.

#### La Solución
Implementación del **Pasaporte Digital de Producto** con trazabilidad desde el olivo hasta la botella. Código QR en cada envase permite al consumidor ver las coordenadas GPS del olivar, fecha de recolección y análisis de laboratorio.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Premium de precio | +0% | +18% | +18% |
| Exportaciones | 30% | 52% | +73% |
| Escaneos QR/mes | 0 | 12,000 | +∞ |
| Fraude detectado | 0 casos | 3 casos bloqueados | 100% protección |

---

## CASO-06: vinosdoe-elite ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `vinosdoe-elite` |
| Empresa | VinosDOE Elite |
| Sector | Agroalimentario |
| Categoría UI | `agro` |
| Ruta | `/success-stories/vinosdoe-elite` |
| Icono | `Wine` |
| Componente | `VinosDOSimulator` |

### Texto Estructurado

#### El Reto
Bodega con viñedos en D.O. Ribera del Duero. La falsificación de etiquetas en mercados asiáticos estaba dañando la marca y generando pérdidas de €2M anuales.

#### La Solución
Implementación del **Anti-Counterfeit Seal** con NFC en cada botella. El chip NFC contiene un DID único vinculado al lote de producción, imposibilitando la duplicación.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Falsificaciones detectadas | 0 | 847 botellas | 100% detección |
| Pérdidas por fraude | €2M/año | €0 | -100% |
| Ventas en Asia | -15%/año | +28%/año | +43pp |
| Precio por botella premium | €45 | €62 | +38% |

### ARIA's Strategic Insight

> "VinosDOE Elite bloqueó 847 botellas falsificadas en China gracias al chip NFC con DID. Las ventas en Asia subieron un 28% porque los distribuidores confían en la autenticidad verificable."

### Configuración del Simulador Premium

Ver sección [Simulador: VinosDOSimulator](#simulador-vinosdosimulator)

---

# SECTOR: MOVILIDAD

---

## CASO-08: portbcn-smart-trade ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `portbcn-smart-trade` |
| Empresa | PortBCN Smart Trade |
| Sector | Movilidad |
| Categoría UI | `mobility` |
| Ruta | `/success-stories/portbcn-smart-trade` |
| Icono | `Ship` |
| Componente | `PortBCNSimulator` |

### Texto Estructurado

#### El Reto
Terminal portuaria con 2,500 contenedores diarios. La documentación manual causaba cuellos de botella en aduana que retrasaban los despachos 48-72 horas de media.

#### La Solución
Implementación del **Trade Document Hub** con interoperabilidad IDS. Los documentos de carga (B/L, certificados fitosanitarios, facturas) se pre-validan digitalmente antes de la llegada del buque.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Tiempo de despacho | 48-72h | 4-6h | -92% |
| Contenedores/día procesados | 2,500 | 3,800 | +52% |
| Errores documentales | 8.5% | 0.3% | -96% |
| Ahorro anual | €0 | €4.2M | +€4.2M |

### Configuración del Simulador Premium

Ver sección [Simulador: PortBCNSimulator](#simulador-portbcnsimulator)

---

# SECTOR: SALUD

---

## CASO-09: biomed-hospital ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `biomed-hospital` |
| Empresa | BioMed Hospital Central |
| Sector | Salud |
| Categoría UI | `health` |
| Ruta | `/success-stories/biomed-hospital` |
| Icono | `HeartPulse` |
| Componente | `BioMedSimulator` |

### Texto Estructurado

#### El Reto
Hospital universitario con 1,200 proveedores de material sanitario. Verificar el cumplimiento del Reglamento MDR (Medical Device Regulation) era un proceso manual que consumía 3 FTE completos.

#### La Solución
Implementación del **Verificador MDR Automático** que cruza los números de registro de cada producto con las bases de datos de EUDAMED y AEMPS en tiempo real.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Productos no conformes detectados | 0.5% post-uso | 100% pre-uso | 100% prevención |
| FTE en verificación | 3 | 0.2 | -93% |
| Riesgo legal | Alto | Mínimo | Eliminado |
| Ahorro anual | €0 | €380,000 | +€380K |

### Configuración del Simulador Premium

Ver sección [Simulador: BioMedSimulator](#simulador-biomedsimulator)

---

# SECTOR: ECONOMÍA SOCIAL

---

## CASO-11: alianza-social-hub ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `alianza-social-hub` |
| Empresa | Alianza Social Hub |
| Sector | Economía Social |
| Categoría UI | `social` |
| Ruta | `/success-stories/alianza-social-hub` |
| Icono | `Users` |
| Componente | `SocialHubSimulator` |

### Texto Estructurado

#### El Reto
Federación de 85 cooperativas de inserción laboral. Demostrar el impacto social para acceder a contratos públicos con cláusulas sociales era subjetivo y poco medible.

#### La Solución
Implementación del **Calculador SROI** (Social Return on Investment) que cuantifica el impacto social en euros. Cada cooperativa puede demostrar que por cada €1 invertido, genera €X de retorno social.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Licitaciones ganadas | 23% | 67% | +191% |
| SROI promedio demostrado | 0 | €3.40 por €1 | +340% ROI social |
| Contratos públicos | €2.1M/año | €7.8M/año | +271% |
| Personas insertadas | 145/año | 412/año | +184% |

### Configuración del Simulador Premium

Ver sección [Simulador: SocialHubSimulator](#simulador-socialhubsimulator)

---

# SECTOR: ENERGÍA

---

## CASO-18: helios-fields ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `helios-fields` |
| Empresa | Helios Fields |
| Sector | Energía |
| Categoría UI | `energy` |
| Ruta | `/success-stories/helios-fields` |
| Icono | `Sun` |
| Componente | `HeliosFieldsSimulator` |

### Texto Estructurado

#### El Reto
Operador de parques solares con 120MW. Pérdida del 8% de eficiencia anual por fallos en inversores y acumulación de suciedad no detectados. La inspección física manual era costosa y tardía.

#### La Solución
Integración de telemetría de paneles vía ProcureData. Las Edge Functions analizan 1M de lecturas diarias, detectando anomalías térmicas y disparando órdenes de limpieza automáticas.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Eficiencia neta | +0% | +5% | +5% |
| Costes mantenimiento | 100% | 75% | -25% |
| Transparencia inversor | 0% | 100% | 100% auditable |
| Tiempo de respuesta | Días | Minutos | -99% |

### Configuración del Simulador Premium

Ver sección [Simulador: HeliosFieldsSimulator](#simulador-heliosfieldssimulator)

---

## CASO-19: aeolus-wind ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `aeolus-wind` |
| Empresa | Aeolus Wind |
| Sector | Energía |
| Categoría UI | `energy` |
| Ruta | `/success-stories/aeolus-wind` |
| Icono | `Wind` |
| Componente | `AeolusWindSimulator` |

### Texto Estructurado

#### El Reto
La conciliación de facturas de energía eólica tardaba 45 días debido a discrepancias entre la medición del parque y el precio del pool horario. El flujo de caja era impredecible.

#### La Solución
Implementación de Smart Contracts vinculados a los sensores de los aerogeneradores. Al detectar la inyección en red, el contrato liquida automáticamente el pago en EUROe al precio pactado.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Tiempo liquidación | 45 días | 2 segundos | -100% |
| Disputas facturación | Frecuentes | 0% | -100% |
| Coste financiero | 100% | 88% | -12% |

### Configuración del Simulador Premium

Ver sección [Simulador: AeolusWindSimulator](#simulador-aeoluswindsimulator)

---

## CASO-22: gridflex-demand ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `gridflex-demand` |
| Empresa | GridFlex Demand |
| Sector | Energía |
| Categoría UI | `energy` |
| Ruta | `/success-stories/gridflex-demand` |
| Icono | `Activity` |
| Componente | `GridFlexSimulator` |

### Texto Estructurado

#### El Reto
La red eléctrica sufría picos de demanda críticos. Las empresas industriales no tenían forma de certificar sus reducciones de consumo en tiempo real para cobrar incentivos del operador del mercado.

#### La Solución
Implementación del **Flexibility Verification System**. Los contadores inteligentes (IoT) registran la bajada de carga en blockchain, permitiendo al agregador liquidar pagos por flexibilidad de forma indisputable.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Ingresos flexibilidad | +0% | +325% | +325% |
| Eventos verificados | 0% | 100% | 100% auditable |
| Capacidad gestionada | 0 MW | 280 MW | +280 MW |

### Configuración del Simulador Premium

Ver sección [Simulador: GridFlexSimulator](#simulador-gridflexsimulator)

---

# SECTOR: ECONOMÍA CIRCULAR

---

## CASO-28: fiber-loop ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `fiber-loop` |
| Empresa | Fiber-Loop Industries |
| Sector | Economía Circular |
| Categoría UI | `circular` |
| Ruta | `/success-stories/fiber-loop` |
| Icono | `Recycle` |
| Componente | `FiberLoopSimulator` |

### Texto Estructurado

#### El Reto
Una marca de moda internacional debía certificar que su nueva colección contenía un 40% de poliéster reciclado real para evitar multas de la Ley de Residuos. La falta de transparencia en la cadena de suministro textil impedía validar el origen del residuo.

#### La Solución
Implementación del **Recycled Content Passport**. Trazabilidad desde el recolector de ropa usada hasta la hilatura. Cada transformación de la fibra se registra inmutablemente, vinculando el lote de residuo con el producto final.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Cumplimiento RAP | 0% | 100% | 100% |
| Ahorro sanciones | €0 | €60,000 | +€60K |
| Precio premium | +0% | +75% | +75% |

### Configuración del Simulador Premium

Ver sección [Simulador: FiberLoopSimulator](#simulador-fiberloopsimulator)

---

## CASO-33: raw-market ⭐ SIMULADOR PREMIUM (BLUEPRINT 2.0)

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `raw-market` |
| Empresa | RawMaterial Market |
| Sector | Economía Circular |
| Categoría UI | `circular` |
| Ruta | `/success-stories/raw-market` |
| Icono | `ShoppingCart` |
| Componente | `RawMarketSimulator` |
| Estado | **Blueprint 2.0** ✅ |

### Texto Estructurado

#### El Reto
Las empresas trataban sus excedentes de aluminio y plástico como "basura", pagando por su retirada. Los compradores de materias primas secundarias no confiaban en la pureza declarada, diluyendo el precio de mercado.

#### La Solución
Creación de un marketplace de revalorización con **Quality Assurance Protocol**. Cada lote de merma incluye un análisis de laboratorio (Data Holder) firmado digitalmente y una política ODRL de uso industrial.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Conversión residuos | 0% | 30% ingresos | +30% |
| Pureza verificada | 0% | 99.9% | +99.9% |
| Tiempo cierre | 15 días | 48 horas | -87% |

### Configuración del Simulador Premium

Ver sección [Simulador: RawMarketSimulator](#simulador-rawmarketsimulator-blueprint-20)

---

# SECTOR: AGRI-TECH

---

## CASO-38: avocado-trust ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `avocado-trust` |
| Empresa | Avocado-Trust |
| Sector | Agri-Tech |
| Categoría UI | `agritech` |
| Ruta | `/success-stories/avocado-trust` |
| Icono | `Satellite` |
| Componente | `AvocadoTrustSimulator` |

### Texto Estructurado

#### El Reto
Exportador de aguacates enfrentaba constantes retrasos en aduanas de USA (USDA/Aphis). La monitorización de plagas manual era insuficiente y carecía de pruebas irrefutables, arriesgando un 20% de merma por inspección física lenta.

#### La Solución
Instalación de sensores de trampas digitales IoT vinculadas a la plataforma. Los logs de "Finca Libre de Plagas" se firman en blockchain cada 10 minutos, generando un Dossier Fitosanitario Digital aceptado en destino.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Tasa rechazo | 3.5% | 0.01% | -99.7% |
| Tiempo inspección | 5 días | 4 horas | -97% |
| Ahorro logístico | €0 | €1,200/lote | +€1,200 |

### Configuración del Simulador Premium

Ver sección [Simulador: AvocadoTrustSimulator](#simulador-avocadotrustsimulator)

---

## CASO-42: berry-water ⭐ SIMULADOR PREMIUM

### Identificación

| Campo | Valor |
|-------|-------|
| ID | `berry-water` |
| Empresa | Berry-Water |
| Sector | Agri-Tech |
| Categoría UI | `agritech` |
| Ruta | `/success-stories/berry-water` |
| Icono | `Droplet` |
| Componente | `BerryWaterSimulator` |

### Texto Estructurado

#### El Reto
Productores en zonas de alto estrés hídrico (Doñana) no podían demostrar a los supermercados europeos que su riego era 100% eficiente, arriesgando el veto comercial por impacto ambiental.

#### La Solución
Integración de sondas de humedad y caudalímetros. ProcureData notariza el ahorro real en blockchain, generando créditos de agua y permitiendo la auditoría digital remota de GlobalG.A.P.

#### Impacto Real

| Métrica | Valor Antes | Valor Después | Mejora |
|---------|-------------|---------------|--------|
| Eficiencia riego | 72% | 98% | +36% |
| Consumo agua | 100% | 70% | -30% |
| Coste auditoría | €5,000 | €0 | -100% |

### Configuración del Simulador Premium

Ver sección [Simulador: BerryWaterSimulator](#simulador-berrywatersimulator)

---

# APÉNDICE: IMPORTS DE COMPONENTES

```typescript
// Importación de todos los simuladores premium
export { RawMarketSimulator } from './simulators/RawMarketSimulator';
export { VinosDOSimulator } from './simulators/VinosDOSimulator';
export { HeliosFieldsSimulator } from './simulators/HeliosFieldsSimulator';
export { AeolusWindSimulator } from './simulators/AeolusWindSimulator';
export { GridFlexSimulator } from './simulators/GridFlexSimulator';
export { FiberLoopSimulator } from './simulators/FiberLoopSimulator';
export { AvocadoTrustSimulator } from './simulators/AvocadoTrustSimulator';
export { BerryWaterSimulator } from './simulators/BerryWaterSimulator';
export { PortBCNSimulator } from './simulators/PortBCNSimulator';
export { BioMedSimulator } from './simulators/BioMedSimulator';
export { SocialHubSimulator } from './simulators/SocialHubSimulator';
```

---

# APÉNDICE: CHECKLIST DE VERIFICACIÓN

## Simuladores Implementados

- [x] RawMarketSimulator - Blueprint 2.0 completo
- [x] VinosDOSimulator - v1.0 funcional
- [x] HeliosFieldsSimulator - v1.0 funcional
- [x] AeolusWindSimulator - v1.0 funcional
- [x] GridFlexSimulator - v1.0 funcional
- [x] FiberLoopSimulator - v1.0 funcional
- [x] AvocadoTrustSimulator - v1.0 funcional
- [x] BerryWaterSimulator - v1.0 funcional
- [x] PortBCNSimulator - v1.0 funcional
- [x] BioMedSimulator - v1.0 funcional
- [x] SocialHubSimulator - v1.0 funcional

## Pendiente de Migración a Blueprint 2.0

- [ ] VinosDOSimulator → Añadir panel ARIA dinámico
- [ ] HeliosFieldsSimulator → Añadir panel ARIA dinámico
- [ ] AeolusWindSimulator → Añadir panel ARIA dinámico
- [ ] GridFlexSimulator → Añadir panel ARIA dinámico
- [ ] FiberLoopSimulator → Añadir panel ARIA dinámico
- [ ] AvocadoTrustSimulator → Añadir panel ARIA dinámico
- [ ] BerryWaterSimulator → Añadir panel ARIA dinámico
- [ ] PortBCNSimulator → Añadir panel ARIA dinámico
- [ ] BioMedSimulator → Añadir panel ARIA dinámico
- [ ] SocialHubSimulator → Añadir panel ARIA dinámico

## Reglas ARIA Documentadas

- [x] Reglas 1-10: Industrial
- [x] Reglas 11-20: Agroalimentario
- [x] Reglas 21-30: Movilidad/Logística
- [x] Reglas 31-39: Salud/Social
- [x] Reglas 40-49: Economía Circular
- [x] Reglas 50-59: Agri-Tech

---

**Fin del Documento - Versión 2.0**
