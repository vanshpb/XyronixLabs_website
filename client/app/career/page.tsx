"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Briefcase, MapPin, Clock, Building2, DollarSign, GraduationCap, Upload, Mail, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Enhanced mock data with contact information
const jobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "0-1 years",
    salary: "Unpaid",
    description: "We're looking for a Frontend Developer intern to join our growing team. You'll be responsible for building beautiful, responsive web applications using modern technologies like React, Next.js, and TypeScript.",
    requirements: [
      "0-1 years of experience with modern JavaScript frameworks",
      "Strong understanding of React and its ecosystem",
      "Experience with TypeScript and state management",
      "Knowledge of modern CSS practices and frameworks",
      "Experience with responsive design and cross-browser compatibility"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Remote-first culture",
      "Flexible working hours",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Professional development budget"
    ],
    postedDate: "2024-03-20",
    company: "Xyronix Labs",
    contactEmail: "hiring@xyronixlabs.com",
    hiringTeam: [
      {
        name: "Aditya Seth",
        role: "Founder & CEO",
      },
      {
        name: "Hemaang Mehra",
        role: "Co-Founder & COO",
      },
      {
        name: "Ishita Jaiswal",
        role: "Technical Recruiter",
      }
    ]
  },
  {
    id: 2,
    title: "Content Writing Intern",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "0-1 years",
    salary: "Unpaid",
    description: "Join our Content Creation team to create beautiful and intuitive user experiences. You'll work closely with product managers, engineers, and stakeholders to deliver exceptional design solutions.",
    requirements: [
      "0-1 years of content writing experience",
      "Strong portfolio showcasing UI/UX work",
      "Proficiency in Figma and modern design tools",
      "Experience with design systems",
      "Strong communication and collaboration skills"
    ],
    benefits: [
      "Competitive salary",
      "Hybrid work model",
      "Health benefits",
      "Annual learning stipend",
      "Design conference attendance"
    ],
    postedDate: "2024-03-19",
    company: "Xyronix Labs",
    contactEmail: "hiring@xyronixlabs.com",
    hiringTeam: [
      {
        name: "Aditya Seth",
        role: "Founder & CEO",
      },
      {
        name: "Hemaang Mehra",
        role: "Co-Founder & COO",
      },
      {
        name: "Ishita Jaiswal",
        role: "Technical Recruiter",
      }
    ]
  },
  {
    id: 3,
    title: "Frontend Intern",
    department: "Web Development",
    location: "Remote",
    type: "Contract",
    experience: "0-1 years",
    salary: "Unpaid",
    description: "Help us build and maintain our website's UI. You'll be responsible for implementing and maintaining our frontend codebase and monitoring systems.",
    requirements: [
      "0-1 years of Frontend development experience",
      "Strong knowledge of Javasript, React.js, Next.js, and Tailwind CSS",
      "Experience with version control systems (Git)",
    ],
    benefits: [
      "Competitive contract rates",
      "Flexible hours",
      "Remote work",
      "Learning opportunities",
      "Project completion bonuses"
    ],
    postedDate: "2024-03-18",
    company: "Xyronix Labs",
    contactEmail: "hiring@xyronixlabs.com",
    hiringTeam: [
      {
        name: "Aditya Seth",
        role: "Founder & CEO",
      },
      {
        name: "Hemaang Mehra",
        role: "Co-Founder & COO",
      },
      {
        name: "Ishita Jaiswal",
        role: "Technical Recruiter",
      }
    ]
  },
  {
    id: 4,
    title: "researcher intern",
    department: "R&D ",
    location: "Remote",
    type: "Contract",
    experience: "0-1 years",
    salary: "Unpaid",
    description: "Join our team as a Research Intern and help us explore new ideas, technologies, and strategies to support our product and engineering decisions. You'll assist in gathering data, analyzing trends, and producing research reports that help shape the future of our platform.",
    requirements: [
      "Consulting Projects",
      "Secondary Research",

      "Analysis Market",

      "Primary Research",

      "Data Analysis",

      "Research Analyst",

      "Market Research"
    ],
    benefits: [
      "Competitive contract rates",
      "Flexible hours",
      "Remote work",
      "Learning opportunities",
      "Project completion bonuses"
    ],
    postedDate: "2024-06-20",
    company: "Xyronix Labs",
    contactEmail: "hiring@xyronixlabs.com",
    hiringTeam: [
      {
        name: "Aditya Seth",
        role: "Founder & CEO",
      },
      {
        name: "Hemaang Mehra",
        role: "Co-Founder & COO",
      },
      {
        name: "Ishita Jaiswal",
        role: "Technical Recruiter",
      }
    ]
  }
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const normalize = (str: string) => str.trim().toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === "all-departments" ||
      normalize(job.department) === normalize(selectedDepartment);
    const matchesType =
      !selectedType ||
      selectedType === "all-types" ||
      job.type === selectedType;
    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-16 bg-[#011529]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build the future with us. Discover exciting opportunities and be part of something extraordinary.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-departments">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="R&D">R&D</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="relative p-6 pl-[1.25rem] hover:pl-6 hover:shadow-xl transition-all duration-300 before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:border-l-2 before:border-primary/50 hover:before:border-l-[4px]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">{job.company}</span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">{job.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.department}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.salary}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {job.experience}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{job.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" onClick={() => setSelectedJob(job)}>
                    View Details
                  </Button>
                  <Button onClick={() => {
                    setSelectedJob(job);
                    setIsApplyDialogOpen(true);
                  }}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Job Details Dialog */}
        <Dialog open={selectedJob !== null && !isApplyDialogOpen} onOpenChange={() => setSelectedJob(null)}>
          {selectedJob && (
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                <DialogDescription className="text-primary">{selectedJob.company}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedJob.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedJob.type}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {selectedJob.salary}
                  </Badge>
                </div>

                {/* Contact Information */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Mail className="h-5 w-5" />
                    <a href={`mailto:${selectedJob.contactEmail}`} className="hover:underline">
                      {selectedJob.contactEmail}
                    </a>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Hiring Team</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedJob.hiringTeam.map((member, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-muted-foreground">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setIsApplyDialogOpen(true);
                }}>
                  Apply for this Position
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

        {/* Application Dialog */}
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          {selectedJob && (
            <DialogContent className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto mt-16 mb-16 flex items-center justify-center">
              <div className="w-full h-[85vh] max-h-[85vh] overflow-y-auto bg-background text-foreground p-6 pb-10 rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
                  <DialogDescription>
                    Please fill out the application form below. All fields are required.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="space-y-2">
                    <Label>Resume</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drag and drop your resume here, or click to browse
                      </p>
                      <Input id="resume" type="file" className="hidden" />
                      <Button variant="secondary" size="sm" onClick={() => document.getElementById('resume')?.click()}>
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Portfolio (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Share your work samples or portfolio
                      </p>
                      <Input id="portfolio" type="file" className="hidden" multiple />
                      <Button variant="secondary" size="sm" onClick={() => document.getElementById('portfolio')?.click()}>
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Application</Button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
