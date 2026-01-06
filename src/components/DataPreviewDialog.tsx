import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DataPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: string;
  productName: string;
  schemaType?: string;
}

// Sample data based on schema type
const getSampleData = (schemaType?: string) => {
  switch (schemaType) {
    case "iot_telemetry":
      return {
        columns: ["timestamp", "device_id", "temperature", "humidity", "status"],
        rows: [
          { timestamp: "2025-01-05T14:30:00Z", device_id: "SENS-001", temperature: 22.4, humidity: 65, status: "active" },
          { timestamp: "2025-01-05T14:25:00Z", device_id: "SENS-002", temperature: 21.8, humidity: 62, status: "active" },
          { timestamp: "2025-01-05T14:20:00Z", device_id: "SENS-001", temperature: 22.1, humidity: 64, status: "active" },
          { timestamp: "2025-01-05T14:15:00Z", device_id: "SENS-003", temperature: 23.0, humidity: 68, status: "warning" },
          { timestamp: "2025-01-05T14:10:00Z", device_id: "SENS-002", temperature: 21.5, humidity: 61, status: "active" },
        ],
        totalRows: 15420,
      };
    case "financial_records":
      return {
        columns: ["fecha", "concepto", "importe", "moneda", "tipo"],
        rows: [
          { fecha: "2025-01-04", concepto: "Factura #INV-2025-001", importe: 12500.00, moneda: "EUR", tipo: "ingreso" },
          { fecha: "2025-01-03", concepto: "Pago proveedor", importe: -3200.00, moneda: "EUR", tipo: "gasto" },
          { fecha: "2025-01-02", concepto: "Factura #INV-2025-002", importe: 8750.00, moneda: "EUR", tipo: "ingreso" },
          { fecha: "2025-01-01", concepto: "Servicios cloud", importe: -450.00, moneda: "EUR", tipo: "gasto" },
          { fecha: "2024-12-31", concepto: "Factura #INV-2024-098", importe: 6300.00, moneda: "EUR", tipo: "ingreso" },
        ],
        totalRows: 2847,
      };
    case "energy_metering":
      return {
        columns: ["timestamp", "meter_id", "kwh", "peak_kw", "source"],
        rows: [
          { timestamp: "2025-01-05T15:00:00Z", meter_id: "MTR-NORTE-01", kwh: 1245.6, peak_kw: 89.2, source: "solar" },
          { timestamp: "2025-01-05T14:00:00Z", meter_id: "MTR-NORTE-01", kwh: 1198.3, peak_kw: 92.1, source: "grid" },
          { timestamp: "2025-01-05T13:00:00Z", meter_id: "MTR-NORTE-02", kwh: 876.4, peak_kw: 67.8, source: "solar" },
          { timestamp: "2025-01-05T12:00:00Z", meter_id: "MTR-SUR-01", kwh: 2134.7, peak_kw: 145.3, source: "wind" },
          { timestamp: "2025-01-05T11:00:00Z", meter_id: "MTR-NORTE-01", kwh: 1089.2, peak_kw: 78.6, source: "solar" },
        ],
        totalRows: 8760,
      };
    case "esg_report":
    case "supply_chain_trace":
      return {
        columns: ["periodo", "emisiones_co2", "energia_renovable", "certificaciones", "score"],
        rows: [
          { periodo: "Q4 2024", emisiones_co2: 1245, energia_renovable: 78, certificaciones: "ISO 14001", score: 85 },
          { periodo: "Q3 2024", emisiones_co2: 1380, energia_renovable: 72, certificaciones: "ISO 14001", score: 81 },
          { periodo: "Q2 2024", emisiones_co2: 1520, energia_renovable: 65, certificaciones: "ISO 14001", score: 76 },
          { periodo: "Q1 2024", emisiones_co2: 1680, energia_renovable: 58, certificaciones: "ISO 9001", score: 72 },
          { periodo: "Q4 2023", emisiones_co2: 1890, energia_renovable: 52, certificaciones: "ISO 9001", score: 68 },
        ],
        totalRows: 24,
      };
    default:
      return {
        columns: ["id", "empresa", "nif", "sector", "estado"],
        rows: [
          { id: "SUP-001", empresa: "Acme Industries S.L.", nif: "B12345678", sector: "Manufactura", estado: "verificado" },
          { id: "SUP-002", empresa: "Tech Solutions SA", nif: "A87654321", sector: "Tecnología", estado: "verificado" },
          { id: "SUP-003", empresa: "Green Energy Corp", nif: "B11223344", sector: "Energía", estado: "pendiente" },
          { id: "SUP-004", empresa: "Logistics Plus SL", nif: "B44332211", sector: "Logística", estado: "verificado" },
          { id: "SUP-005", empresa: "Agro Fresh SA", nif: "A99887766", sector: "Agricultura", estado: "verificado" },
        ],
        totalRows: 156,
      };
  }
};

export const DataPreviewDialog = ({
  open,
  onOpenChange,
  transactionId,
  productName,
  schemaType,
}: DataPreviewDialogProps) => {
  const navigate = useNavigate();
  const sampleData = getSampleData(schemaType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" />
            Vista Previa - {productName}
          </DialogTitle>
          <DialogDescription>
            Mostrando las primeras 5 filas del dataset
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {sampleData.columns.map((col) => (
                  <TableHead key={col} className="font-semibold capitalize">
                    {col.replace(/_/g, " ")}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.rows.map((row, i) => (
                <TableRow key={i}>
                  {sampleData.columns.map((col) => (
                    <TableCell key={col} className="font-mono text-sm">
                      {typeof row[col as keyof typeof row] === "number"
                        ? row[col as keyof typeof row].toLocaleString("es-ES")
                        : String(row[col as keyof typeof row])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Badge variant="secondary" className="text-sm">
            {sampleData.totalRows.toLocaleString("es-ES")} filas totales
          </Badge>
          <Button onClick={() => navigate(`/data/view/${transactionId}`)}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver Datos Completos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
