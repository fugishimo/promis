
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { TrendingUp, Newspaper, Plus, MoreHorizontal, PieChart, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TimePeriod = "24h" | "7d" | "90d" | "1y" | "all";

interface WatchlistItem {
  id: string;
  type: "STOCKS" | "FUTURES" | "FOREX" | "CRYPTO";
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon?: string;
}

const SortableWatchlistItem = ({ item }: { item: WatchlistItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="px-4 py-2 hover:bg-neutral-50 grid grid-cols-[auto,1fr,1fr,1fr,1fr] gap-4 text-sm items-center group"
    >
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-neutral-400" />
      </button>
      <div className="font-medium text-neutral-900">
        {item.symbol}
      </div>
      <div className="text-right text-neutral-900">
        {item.price.toLocaleString()}
      </div>
      <div className={`text-right ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {item.change >= 0 ? '+' : ''}{item.change}
      </div>
      <div className={`text-right ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
      </div>
    </div>
  );
};

const LiveMarkets = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("24h");
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set(["STOCKS", "FUTURES", "CRYPTO"]));
  const [items, setItems] = useState<WatchlistItem[]>([
    {
      id: "1",
      type: "STOCKS",
      symbol: "NFLX",
      name: "Netflix",
      price: 1058.60,
      change: 14.91,
      changePercent: 1.43,
    },
    {
      id: "2",
      type: "FUTURES",
      symbol: "USOIL",
      name: "Crude Oil",
      price: 70.49,
      change: -0.97,
      changePercent: -1.35,
    },
    {
      id: "3",
      type: "CRYPTO",
      symbol: "BTCUSD",
      name: "Bitcoin",
      price: 97658,
      change: 67,
      changePercent: 0.07,
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleType = (type: string) => {
    const newExpandedTypes = new Set(expandedTypes);
    if (newExpandedTypes.has(type)) {
      newExpandedTypes.delete(type);
    } else {
      newExpandedTypes.add(type);
    }
    setExpandedTypes(newExpandedTypes);
  };

  // Filter out empty sections
  const types = ["STOCKS", "FUTURES", "FOREX", "CRYPTO"].filter(type => 
    items.some(item => item.type === type)
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-[1400px] mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-900">Live Markets</h1>
              <p className="text-neutral-500 mt-2">Real-time market updates and analysis</p>
            </header>

            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                {mockUpdates.map((update) => (
                  <article
                    key={update.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 animate-fadeIn"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-neutral-900">
                          {update.title}
                        </h2>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-primary font-medium">
                            {update.analyst}
                          </span>
                          <span className="text-neutral-500 text-sm">
                            {update.time}
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-neutral-600">{update.content}</p>
                  </article>
                ))}
              </div>

              <aside className="w-[400px] space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <Newspaper className="w-5 h-5 mr-2" />
                    Market News
                  </h2>
                  <div className="space-y-4">
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <span className="text-xs font-medium text-neutral-500">BREAKING</span>
                      <p className="text-sm text-neutral-900 mt-1">
                        Fed Minutes: Officials saw inflation risks warranting more rate hikes
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <span className="text-xs font-medium text-neutral-500">MACRO</span>
                      <p className="text-sm text-neutral-900 mt-1">
                        US Job openings fall to lowest level since March 2021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
                  <div className="p-4 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
                        Watchlist
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <PieChart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      {(["24h", "7d", "90d", "1y", "all"] as TimePeriod[]).map((period) => (
                        <Button
                          key={period}
                          variant={selectedPeriod === period ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPeriod(period)}
                          className="text-xs"
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    <div className="px-4 py-2 text-sm text-neutral-500 grid grid-cols-[auto,1fr,1fr,1fr,1fr] gap-4">
                      <div className="w-4"></div>
                      <div>Symbol</div>
                      <div className="text-right">Last</div>
                      <div className="text-right">Chg</div>
                      <div className="text-right">Chg%</div>
                    </div>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      {types.map((type) => (
                        <div key={type}>
                          <button
                            onClick={() => toggleType(type)}
                            className="w-full px-4 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 flex items-center"
                          >
                            <span className="transform transition-transform duration-200" style={{
                              transform: expandedTypes.has(type) ? 'rotate(0deg)' : 'rotate(-90deg)'
                            }}>▼</span>
                            <span className="ml-2">{type}</span>
                          </button>
                          {expandedTypes.has(type) && (
                            <SortableContext
                              items={items.filter(item => item.type === type).map(item => item.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {items
                                .filter(item => item.type === type)
                                .map((item) => (
                                  <SortableWatchlistItem key={item.id} item={item} />
                                ))}
                            </SortableContext>
                          )}
                        </div>
                      ))}
                    </DndContext>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LiveMarkets;
