"use client"

import { useState } from "react"
import {
  FileIcon,
  FileTextIcon,
  FileImageIcon,
  FileVideoIcon,
  FileIcon as FilePdfIcon,
  FileArchiveIcon,
  FileAudioIcon,
  SearchIcon,
  DownloadIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  TrendingUpIcon,
  ClockIcon,
  StarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Enhanced sample data with more properties
const resources = [
  {
    id: 1,
    name: "Advanced Calculus Fundamentals",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2023-05-15",
    category: "Mathematics",
    description: "Comprehensive guide to advanced calculus concepts including limits, derivatives, and integrals",
    url: "/files/mathematics-fundamentals.pdf",
    thumbnail: "/placeholder.svg?height=400&width=300",
    downloads: 1247,
    rating: 4.8,
    isFavorite: false,
    isNew: false,
    isTrending: true,
  },
  {
    id: 2,
    name: "Quantum Physics Introduction",
    type: "pdf",
    size: "3.1 MB",
    uploadDate: "2023-06-02",
    category: "Physics",
    description: "Explore the fascinating world of quantum mechanics and particle physics",
    url: "/files/intro-physics.pdf",
    thumbnail: "/placeholder.svg?height=400&width=300",
    downloads: 892,
    rating: 4.6,
    isFavorite: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: 3,
    name: "Interactive World History Timeline",
    type: "image",
    size: "1.8 MB",
    uploadDate: "2023-04-20",
    category: "History",
    description: "Visual timeline showcasing major world events from ancient civilizations to modern times",
    url: "/files/history-timeline.jpg",
    thumbnail: "/placeholder.svg?height=400&width=300",
    downloads: 2156,
    rating: 4.9,
    isFavorite: false,
    isNew: false,
    isTrending: true,
  },
  {
    id: 4,
    name: "Chemistry Lab Safety Protocol",
    type: "video",
    size: "45.2 MB",
    uploadDate: "2023-07-10",
    category: "Chemistry",
    description: "Essential safety procedures and protocols for chemistry laboratory work",
    url: "/files/lab-safety.mp4",
    thumbnail: "/placeholder.svg?height=400&width=300",
    downloads: 567,
    rating: 4.7,
    isFavorite: false,
    isNew: true,
    isTrending: false,
  },
  {
    id: 5,
    name: "Classic Literature Anthology",
    type: "document",
    size: "5.6 MB",
    uploadDate: "2023-03-28",
    category: "Literature",
    description: "Curated collection of timeless literary masterpieces and analysis",
    url: "/files/literature-anthology.docx",
    thumbnail: "/placeholder.svg?height=400&width=300",
    downloads: 1834,
    rating: 4.5,
    isFavorite: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: 6,
    name: "Cell Biology Structure Guide",
    type: "presentation",
    size: "8.2 MB",
    uploadDate: "2023-06-15",
    category: "Biology",
    description: "Detailed presentation on cellular anatomy, organelles, and biological processes",
    url: "/files/cell-structure.pptx",
    thumbnail: "/placeholder.svg?height=400&width=300",
    downloads: 743,
    rating: 4.4,
    isFavorite: false,
    isNew: false,
    isTrending: false,
  },
]

const getFileIcon = (type: string, className = "h-8 w-8") => {
  const iconClass = cn(className)
  switch (type) {
    case "pdf":
      return <FilePdfIcon className={cn(iconClass, "text-red-500")} />
    case "image":
      return <FileImageIcon className={cn(iconClass, "text-blue-500")} />
    case "video":
      return <FileVideoIcon className={cn(iconClass, "text-purple-500")} />
    case "audio":
      return <FileAudioIcon className={cn(iconClass, "text-green-500")} />
    case "archive":
      return <FileArchiveIcon className={cn(iconClass, "text-yellow-500")} />
    case "document":
    case "presentation":
      return <FileTextIcon className={cn(iconClass, "text-orange-500")} />
    default:
      return <FileIcon className={cn(iconClass, "text-gray-500")} />
  }
}

const categories = Array.from(new Set(resources.map((resource) => resource.category)))

export function FileManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedFile, setSelectedFile] = useState<(typeof resources)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")

  const filteredResources = resources
    .filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
      const matchesType = typeFilter === "all" || resource.type === typeFilter

      return matchesSearch && matchesCategory && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.downloads - a.downloads
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      }
    })

  const handlePreview = (file: (typeof resources)[0]) => {
    setSelectedFile(file)
  }

  const handleDownload = (file: (typeof resources)[0]) => {
    alert(`Downloading ${file.name}`)
  }

  const toggleFavorite = (fileId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggling favorite for file ${fileId}`)
  }

  const closePreview = () => {
    setSelectedFile(null)
  }

  return (
    <div className="space-y-8">
      {/* Enhanced search and filter controls */}
      <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20">
        <div className="flex flex-col gap-6">
          {/* Search bar */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for educational resources..."
              className="pl-12 h-12 text-lg bg-white/80 dark:bg-slate-900/80 border-0 shadow-sm focus:shadow-md transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters and controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-white/80 dark:bg-slate-900/80 border-0 shadow-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] bg-white/80 dark:bg-slate-900/80 border-0 shadow-sm">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] bg-white/80 dark:bg-slate-900/80 border-0 shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
                <TabsList className="bg-white/80 dark:bg-slate-900/80">
                  <TabsTrigger value="grid" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    <GridIcon className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    <ListIcon className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-blue-600">{filteredResources.length}</span> of{" "}
          <span className="font-semibold">{resources.length}</span> resources
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <TrendingUpIcon className="h-4 w-4" />
            <span>Trending</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            <span>Recently Added</span>
          </div>
        </div>
      </div>

      {/* Enhanced grid view */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="group overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
                <img
                  src={resource.thumbnail || "/placeholder.svg"}
                  alt={resource.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <Badge className="bg-white/90 text-gray-800 shadow-sm">{resource.type.toUpperCase()}</Badge>
                  {resource.isNew && <Badge className="bg-green-500 text-white shadow-sm">NEW</Badge>}
                  {resource.isTrending && (
                    <Badge className="bg-orange-500 text-white shadow-sm flex items-center gap-1">
                      <TrendingUpIcon className="h-3 w-3" />
                      TRENDING
                    </Badge>
                  )}
                </div>

                {/* Favorite button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-sm"
                  onClick={() => toggleFavorite(resource.id)}
                >
                  <HeartIcon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      resource.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600",
                    )}
                  />
                </Button>

                {/* Quick action overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreview(resource)}
                    className="bg-white/90 hover:bg-white"
                  >
                    <EyeIcon className="mr-1 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleDownload(resource)} className="bg-blue-600 hover:bg-blue-700">
                    <DownloadIcon className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  {getFileIcon(resource.type, "h-6 w-6")}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{resource.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>{resource.size}</span>
                  <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {resource.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DownloadIcon className="h-3 w-3" />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handlePreview(resource)}>
                  <EyeIcon className="mr-1 h-4 w-4" />
                  Preview
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ShareIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleDownload(resource)}>
                    <DownloadIcon className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Enhanced list view */}
      {viewMode === "list" && (
        <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl shadow-lg border-0 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 bg-gray-50/80 dark:bg-slate-700/80 p-4 font-medium text-sm">
            <div className="col-span-5">Resource</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-1">Rating</div>
            <div className="col-span-1">Downloads</div>
            <div className="col-span-2">Actions</div>
          </div>
          {filteredResources.map((resource, index) => (
            <div
              key={resource.id}
              className={cn(
                "grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors",
                index !== filteredResources.length - 1 && "border-b border-gray-200/50 dark:border-slate-600/50",
              )}
            >
              <div className="col-span-5 flex items-center gap-3">
                <div className="relative">
                  {getFileIcon(resource.type, "h-8 w-8")}
                  {resource.isNew && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    {resource.name}
                    {resource.isTrending && <TrendingUpIcon className="h-4 w-4 text-orange-500" />}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{resource.description}</div>
                </div>
              </div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-xs">
                  {resource.category}
                </Badge>
              </div>
              <div className="col-span-1 text-sm text-gray-600 dark:text-gray-400">{resource.size}</div>
              <div className="col-span-1 flex items-center gap-1 text-sm">
                <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
              <div className="col-span-1 text-sm text-gray-600 dark:text-gray-400">
                {resource.downloads.toLocaleString()}
              </div>
              <div className="col-span-2 flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(resource.id)}>
                  <HeartIcon
                    className={cn("h-4 w-4", resource.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")}
                  />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handlePreview(resource)}>
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(resource)}>
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced empty state */}
      {filteredResources.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mb-4">
            <FileIcon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            We couldn't find any resources matching your criteria. Try adjusting your search or filters to discover more
            content.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("all")
              setTypeFilter("all")
            }}
            className="bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Enhanced preview dialog */}
      {selectedFile && (
        <Dialog open={!!selectedFile} onOpenChange={closePreview}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-md dark:bg-slate-900/95">
            <DialogHeader className="pb-4 border-b border-gray-200/50 dark:border-slate-700/50">
              <DialogTitle className="flex items-center gap-3 text-xl">
                {getFileIcon(selectedFile.type, "h-6 w-6")}
                <div>
                  <div className="flex items-center gap-2">
                    {selectedFile.name}
                    {selectedFile.isTrending && <TrendingUpIcon className="h-5 w-5 text-orange-500" />}
                    {selectedFile.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                  </div>
                  <div className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
                    {selectedFile.category} • {selectedFile.size}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Preview area */}
              <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 shadow-inner">
                {selectedFile.type === "image" ? (
                  <img
                    src={selectedFile.thumbnail || "/placeholder.svg"}
                    alt={selectedFile.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    {getFileIcon(selectedFile.type, "h-16 w-16")}
                    <div className="ml-4 text-center">
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {selectedFile.type.toUpperCase()} Preview
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full preview available after download</p>
                    </div>
                  </div>
                )}
              </div>

              {/* File details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{selectedFile.rating}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                    <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    Rating
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{selectedFile.downloads.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
                </div>
                <div className="text-center p-4 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{selectedFile.size}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">File Size</div>
                </div>
                <div className="text-center p-4 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{selectedFile.type.toUpperCase()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">File Type</div>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedFile.description}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => toggleFavorite(selectedFile.id)}>
                    <HeartIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFile.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600",
                      )}
                    />
                    {selectedFile.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                  <Button variant="outline">
                    <ShareIcon className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button
                  onClick={() => handleDownload(selectedFile)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
