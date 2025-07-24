"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpenIcon,
  GraduationCapIcon,
  UsersIcon,
  SettingsIcon,
  BellIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  StarIcon,
  TrendingUpIcon,
  AwardIcon,
} from "lucide-react"

const subjects = [
  { name: "Mathematics", icon: "📐", count: 45 },
  { name: "Physics", icon: "⚛️", count: 32 },
  { name: "Chemistry", icon: "🧪", count: 28 },
  { name: "Biology", icon: "🧬", count: 38 },
  { name: "History", icon: "📜", count: 25 },
  { name: "Literature", icon: "📚", count: 42 },
]

const tools = [
  { name: "Study Planner", description: "Organize your learning schedule", icon: "📅" },
  { name: "Quiz Builder", description: "Create interactive quizzes", icon: "❓" },
  { name: "Note Taker", description: "Digital note-taking tool", icon: "📝" },
  { name: "Progress Tracker", description: "Monitor learning progress", icon: "📊" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <GraduationCapIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduHub
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Learning Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800">
                  <BookOpenIcon className="mr-2 h-4 w-4" />
                  Subjects
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((subject) => (
                        <NavigationMenuLink
                          key={subject.name}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{subject.icon}</span>
                              <div className="text-sm font-medium leading-none">{subject.name}</div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {subject.count}
                            </Badge>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {tools.map((tool) => (
                        <NavigationMenuLink
                          key={tool.name}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group cursor-pointer"
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{tool.icon}</span>
                            <div>
                              <div className="text-sm font-medium leading-none group-hover:text-blue-600 transition-colors">
                                {tool.name}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  Community
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                  <AwardIcon className="mr-2 h-4 w-4" />
                  Achievements
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hidden md:flex">
              <BellIcon className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white">
                3
              </Badge>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  <UserIcon className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StarIcon className="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUpIcon className="mr-2 h-4 w-4" />
                  Progress
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-md dark:bg-slate-900/95 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpenIcon className="mr-2 h-4 w-4" />
                Subjects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Tools
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <UsersIcon className="mr-2 h-4 w-4" />
                Community
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AwardIcon className="mr-2 h-4 w-4" />
                Achievements
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
