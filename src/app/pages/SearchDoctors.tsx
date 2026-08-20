import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Stethoscope, Clock, MapPin, Star, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const specialties = ["الكل", "طب عام", "قلب", "أطفال", "عظام", "جلدية", "باطنة", "نساء وتوليد"];

const doctors = [
  { id: 1, name: "د. محمد الحارثي", specialty: "قلب وأوعية دموية", branch: "الفرع الرئيسي", price: 200, rating: 4.8, reviewCount: 128, waitTime: "20 دقيقة", nextSlot: "غداً 10:30 ص", available: true },
  { id: 2, name: "د. إيمي شن", specialty: "طب عام", branch: "الفرع الرئيسي", price: 150, rating: 4.6, reviewCount: 95, waitTime: "15 دقيقة", nextSlot: "اليوم 2:00 م", available: true },
  { id: 3, name: "د. سارة وليامز", specialty: "أطفال", branch: "فرع الشمال", price: 180, rating: 4.9, reviewCount: 210, waitTime: "20 دقيقة", nextSlot: "غداً 9:00 ص", available: true },
  { id: 4, name: "د. جيمس أندرسون", specialty: "عظام", branch: "الفرع الرئيسي", price: 250, rating: 4.5, reviewCount: 76, waitTime: "30 دقيقة", nextSlot: "بعد غد 11:00 ص", available: false },
  { id: 5, name: "د. ريم المنصور", specialty: "جلدية", branch: "فرع الشمال", price: 190, rating: 4.7, reviewCount: 143, waitTime: "20 دقيقة", nextSlot: "اليوم 4:30 م", available: true },
];

export function SearchDoctors() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("الكل");
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null);

  const filtered = doctors.filter((d) => {
    const matchQuery = !query || d.name.includes(query) || d.specialty.includes(query) || d.branch.includes(query);
    const matchSpec = selectedSpec === "الكل" || d.specialty.includes(selectedSpec);
    return matchQuery && matchSpec;
  });

  if (selectedDoctor) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          <button onClick={() => setSelectedDoctor(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight className="w-4 h-4" />
            العودة للبحث
          </button>

          {/* Doctor Profile */}
          <Card className="border-border shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 flex-row-reverse mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-right">
                  <h2 className="text-2xl font-bold text-foreground">{selectedDoctor.name}</h2>
                  <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                  <div className="flex items-center gap-3 mt-2 justify-end">
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedDoctor.branch}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                      <span className="text-xs text-muted-foreground">({selectedDoctor.reviewCount} تقييم)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "رسوم الكشف", value: `${selectedDoctor.price} ر.س` },
                  { label: "متوسط وقت الانتظار", value: selectedDoctor.waitTime },
                  { label: "أقرب موعد", value: selectedDoctor.nextSlot },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center p-3 bg-muted/30 rounded-xl">
                    <p className="text-lg font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-semibold text-right mb-3">المواعيد المتاحة</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {["09:00 ص", "10:30 ص", "12:00 م", "02:00 م", "03:30 م", "04:30 م"].map((slot) => (
                  <button
                    key={slot}
                    className="py-2.5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 text-sm font-medium transition-all flex items-center justify-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    {slot}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => navigate("/book-appointment")}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md gap-2"
              >
                <Calendar className="w-5 h-5" />
                حجز موعد
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-foreground">البحث عن طبيب</h1>
          <p className="text-muted-foreground mt-1">ابحث بالاسم أو التخصص أو الفرع</p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن طبيب أو تخصص..."
            className="pr-12 h-14 text-lg bg-card border-border rounded-2xl shadow-sm text-right"
          />
        </div>

        {/* Specialty filter */}
        <div className="flex gap-2 flex-wrap">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSpec(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${selectedSpec === s ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground text-right">{filtered.length} طبيب متاح</p>
        <div className="space-y-3">
          {filtered.map((d) => (
            <Card key={d.id} className="border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedDoctor(d)}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-foreground">{d.name}</h3>
                      <p className="text-sm text-muted-foreground">{d.specialty}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-xs gap-1">
                          <MapPin className="w-3 h-3" />
                          {d.branch}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-sm">{d.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-lg font-bold text-primary">{d.price} ر.س</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{d.nextSlot}</span>
                    </div>
                    <Badge variant="outline" className={d.available ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-gray-100 text-gray-600 text-xs"}>
                      {d.available ? "متاح" : "مشغول"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
