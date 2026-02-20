"use client"

import { User, Briefcase, Calendar, Globe } from "lucide-react"

interface ProjectInfoCardProps {
  client: string
  projectType: string
  date: string
  website: string
}

export function ProjectInfoCard({
  client,
  projectType,
  date,
  website,
}: ProjectInfoCardProps) {
  return (
    <div className="sticky top-28">
      <div className="bg-[#f5f7f0] rounded-2xl p-8">
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">
          Project Information
        </h3>

        <div className="space-y-6">
          {/* Client */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2d6a2e]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#2d6a2e]" />
            </div>
            <div>
              <p className="text-sm text-[#888] mb-1">Client</p>
              <p className="font-semibold text-[#1a1a1a]">{client}</p>
            </div>
          </div>

          {/* Project Type */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2d6a2e]/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#2d6a2e]" />
            </div>
            <div>
              <p className="text-sm text-[#888] mb-1">Project Type</p>
              <p className="font-semibold text-[#1a1a1a]">{projectType}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2d6a2e]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#2d6a2e]" />
            </div>
            <div>
              <p className="text-sm text-[#888] mb-1">Date</p>
              <p className="font-semibold text-[#1a1a1a]">{date}</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2d6a2e]/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#2d6a2e]" />
            </div>
            <div>
              <p className="text-sm text-[#888] mb-1">Website</p>
              {website ? (
                <a
                  href={website.startsWith("http") ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#2d6a2e] hover:underline"
                >
                  {website}
                </a>
              ) : (
                <p className="font-semibold text-[#1a1a1a]">N/A</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
