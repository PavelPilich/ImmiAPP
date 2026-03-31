import { useState, useMemo, useEffect } from "react";
// ─── ICONS (inline SVG components) ───
const Icons = {
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Map: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Dollar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Cloud: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  Alert: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Chart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  Truck: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Box: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  File: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Target: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Menu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  ChevDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="6 9 12 15 18 9"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  GPS: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Ticket: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 9h20v6H2z"/><line x1="8" y1="12" x2="8" y2="12.01"/><line x1="12" y1="12" x2="12" y2="12.01"/><line x1="16" y1="12" x2="16" y2="12.01"/></svg>,
  Msg: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Send: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
};

// ─── TYPES ───
interface Project {
  id: string;
  address: string;
  city: string;
  state: string;
  customer: string;
  phone: string;
  email: string;
  rep: string;
  date: string;
  stage: "LEAD" | "JOB" | "COMPLETE";
  pipeline: string;
  pipelineIdx: number;
  progress: number;
  type: string;
  source: string;
  quote: number;
  cost: number;
  profit: number;
  lat: number;
  lng: number;
  insurance: { company: string; claim: string; deductible: number } | null;
  notes: string;
  warranty: { years: number; expires: string } | null;
}

// ─── TICKET TYPES ───
interface TicketMsg { author: string; text: string; time: string; isStaff: boolean }
interface Ticket {
  id: string; title: string; customer: string; phone: string; projectId: string | null;
  category: "Warranty Claim" | "Service Request" | "Emergency" | "Change Order" | "Complaint" | "Material Request";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "PENDING" | "RESOLVED" | "CLOSED";
  assignee: string; created: string; updated: string; description: string; messages: TicketMsg[];
}

const ticketsData: Ticket[] = [
  { id: "TKT-001", title: "Roof still leaking near chimney after replacement", customer: "Robert Johnson", phone: "(612) 555-0102", projectId: "MN-0023", category: "Warranty Claim", priority: "URGENT", status: "OPEN", assignee: "Mike Torres", created: "Mar 28", updated: "Mar 30", description: "Customer reporting active water intrusion near chimney flashing three weeks post roof replacement. Interior ceiling staining visible in master bedroom.", messages: [
    { author: "Robert Johnson", text: "Still getting water in near the chimney. You replaced my roof 3 weeks ago — now I have ceiling damage in my bedroom.", time: "Mar 28, 9:14 AM", isStaff: false },
    { author: "Mike Torres", text: "Hi Robert, I sincerely apologize. I'll have Team Alpha at your property tomorrow 9–11 AM to inspect the flashing. We will make it right.", time: "Mar 28, 10:02 AM", isStaff: true },
    { author: "Robert Johnson", text: "Ok. The water was coming in again last night during the rain.", time: "Mar 29, 7:45 AM", isStaff: false },
  ]},
  { id: "TKT-002", title: "Moisture readings still high — not fully dried", customer: "Patricia Davis", phone: "(612) 555-0198", projectId: "MN-0089", category: "Service Request", priority: "HIGH", status: "IN_PROGRESS", assignee: "Sarah Chen", created: "Mar 27", updated: "Mar 29", description: "Water damage project. Customer reports dehumidifiers were removed but moisture meter readings in basement wall still showing 18%. IICRC standard is below 12%.", messages: [
    { author: "Patricia Davis", text: "Your crew took the equipment away but the walls still feel damp. I have my own moisture meter and it reads 18%.", time: "Mar 27, 2:30 PM", isStaff: false },
    { author: "Sarah Chen", text: "Patricia, thank you for catching that. We should not have removed the equipment yet. I'm scheduling a return visit with monitoring equipment for tomorrow.", time: "Mar 27, 3:15 PM", isStaff: true },
  ]},
  { id: "TKT-003", title: "Emergency — pipe burst flooding basement", customer: "James Wilson", phone: "(612) 555-0234", projectId: null, category: "Emergency", priority: "URGENT", status: "IN_PROGRESS", assignee: "Jake Williams", created: "Mar 30, 6:12 AM", updated: "Mar 30, 7:30 AM", description: "New customer. Pipe burst in basement overnight. 3–4 inches of standing water. Furnace and water heater may be compromised.", messages: [
    { author: "James Wilson", text: "HELP — my basement is flooded. Pipe burst overnight. Water heater is underwater. I need someone NOW.", time: "Mar 30, 6:12 AM", isStaff: false },
    { author: "Jake Williams", text: "James, I'm dispatching an emergency crew right now. ETA 45 minutes. Shut off your main water valve if you can — usually near the meter. Don't touch electrical panels.", time: "Mar 30, 6:18 AM", isStaff: true },
    { author: "James Wilson", text: "Ok I found the shutoff. Water is off. Please hurry.", time: "Mar 30, 6:22 AM", isStaff: false },
  ]},
  { id: "TKT-004", title: "Siding color doesn't match approved sample", customer: "Linda Martinez", phone: "(763) 555-0145", projectId: "MN-0156", category: "Complaint", priority: "HIGH", status: "OPEN", assignee: "Ana Rodriguez", created: "Mar 29", updated: "Mar 29", description: "Installed LP SmartSide is noticeably darker than the color chip approved by customer. Customer requesting full replacement.", messages: [
    { author: "Linda Martinez", text: "The siding color is completely wrong. It looks nothing like what I approved. I want this fixed.", time: "Mar 29, 11:20 AM", isStaff: false },
    { author: "Ana Rodriguez", text: "Linda, I'm so sorry. I'm pulling the approved color spec now and will compare it to what was installed. I'll call you this afternoon.", time: "Mar 29, 12:05 PM", isStaff: true },
  ]},
  { id: "TKT-005", title: "Add skylight to approved scope", customer: "Michael Brown", phone: "(612) 555-0317", projectId: "MN-0201", category: "Change Order", priority: "MEDIUM", status: "PENDING", assignee: "Tom Baker", created: "Mar 26", updated: "Mar 28", description: "Customer wants to add a 21\"x46\" Velux skylight to the existing roof replacement scope. Requires insurance pre-authorization.", messages: [
    { author: "Michael Brown", text: "Can we add a skylight while you're already up there? I've been wanting one for years.", time: "Mar 26, 3:00 PM", isStaff: false },
    { author: "Tom Baker", text: "Absolutely Michael! I'll write up a change order. The Velux VS C06 is a great fit for your roof pitch. I'll send pricing by end of day.", time: "Mar 26, 4:30 PM", isStaff: true },
    { author: "Michael Brown", text: "Great, looking forward to the quote.", time: "Mar 26, 4:45 PM", isStaff: false },
  ]},
  { id: "TKT-006", title: "Gutter guard pulling away from fascia", customer: "Barbara Thompson", phone: "(763) 555-0289", projectId: "MN-0067", category: "Warranty Claim", priority: "MEDIUM", status: "RESOLVED", assignee: "Mike Torres", created: "Mar 20", updated: "Mar 25", description: "LeafGuard section on south face detaching at two fastener points. Under 2-year warranty. Crew re-secured and added additional fasteners.", messages: [
    { author: "Barbara Thompson", text: "Part of my gutter guard is hanging down on the back of the house.", time: "Mar 20, 1:00 PM", isStaff: false },
    { author: "Mike Torres", text: "We'll be out Thursday to fix that under warranty, no charge.", time: "Mar 20, 2:30 PM", isStaff: true },
    { author: "Mike Torres", text: "Repair complete. Added two additional stainless fasteners for extra security. You're all set!", time: "Mar 25, 4:00 PM", isStaff: true },
  ]},
  { id: "TKT-007", title: "Need extra squares of shingles for garage", customer: "Richard Anderson", phone: "(612) 555-0412", projectId: "MN-0312", category: "Material Request", priority: "LOW", status: "OPEN", assignee: "Sarah Chen", created: "Mar 29", updated: "Mar 29", description: "Customer wants to purchase leftover OC Duration Pewter Gray shingles to store for future repairs on detached garage.", messages: [
    { author: "Richard Anderson", text: "Do you have any extra shingles from my job? I'd like to buy a few squares for my garage roof repairs down the road.", time: "Mar 29, 10:10 AM", isStaff: false },
  ]},
  { id: "TKT-008", title: "Insurance adjuster denied full window replacement", customer: "Susan Garcia", phone: "(763) 555-0503", projectId: "MN-0445", category: "Service Request", priority: "HIGH", status: "IN_PROGRESS", assignee: "Jake Williams", created: "Mar 25", updated: "Mar 30", description: "Insurance carrier approved partial window repair only. Customer requesting supplement negotiation. 8 of 14 windows have functional damage beyond repair threshold.", messages: [
    { author: "Susan Garcia", text: "State Farm only approved repair on 4 windows but your inspection said 8 need full replacement. Can you fight this?", time: "Mar 25, 9:00 AM", isStaff: false },
    { author: "Jake Williams", text: "Yes — and we will. I'm preparing a supplement with photos from every window, HAAG standard references, and manufacturer repair limits. Expect a response within 5 business days.", time: "Mar 25, 10:30 AM", isStaff: true },
  ]},
  { id: "TKT-009", title: "Scheduling question — when does my job start?", customer: "Karen White", phone: "(612) 555-0611", projectId: "MN-0389", category: "Service Request", priority: "LOW", status: "RESOLVED", assignee: "Ana Rodriguez", created: "Mar 22", updated: "Mar 23", description: "Customer inquiring about job start date. Materials were on backorder. Confirmed start for April 3.", messages: [
    { author: "Karen White", text: "I haven't heard anything about when my siding job starts. It's been 3 weeks since I signed.", time: "Mar 22, 2:00 PM", isStaff: false },
    { author: "Ana Rodriguez", text: "Karen, I apologize for the delay! LP SmartSide was backordered but materials arrived this morning. Your job is confirmed for April 3rd. We'll call the night before to confirm the crew arrival window.", time: "Mar 23, 9:00 AM", isStaff: true },
  ]},
  { id: "TKT-010", title: "Deck boards cupping after 6 months", customer: "Thomas Lee", phone: "(763) 555-0712", projectId: "MN-0190", category: "Warranty Claim", priority: "MEDIUM", status: "OPEN", assignee: "Tom Baker", created: "Mar 30", updated: "Mar 30", description: "Composite decking installed in September showing cupping across 3 boards on the west exposure. Possible moisture intrusion under decking.", messages: [
    { author: "Thomas Lee", text: "My deck boards are warping. Three of them are cupped pretty badly on the side that faces west. Is this covered?", time: "Mar 30, 8:45 AM", isStaff: false },
  ]},
  { id: "TKT-011", title: "Permit still not pulled — job on hold", customer: "Lisa Moore", phone: "(612) 555-0819", projectId: "MN-0502", category: "Complaint", priority: "HIGH", status: "PENDING", assignee: "Sarah Chen", created: "Mar 28", updated: "Mar 29", description: "City of Plymouth issued stop-work order. Permit for addition was not pulled before framing began. Customer is upset and neighbor filed complaint.", messages: [
    { author: "Lisa Moore", text: "I have a stop-work order on my house because you started framing WITHOUT a permit. My neighbor called the city. This is a serious problem.", time: "Mar 28, 11:00 AM", isStaff: false },
    { author: "Sarah Chen", text: "Lisa, I sincerely apologize. This should not have happened. I'm personally handling the permit application today — expedited. I'll have an update for you by 3 PM.", time: "Mar 28, 11:45 AM", isStaff: true },
  ]},
  { id: "TKT-012", title: "Mold found behind drywall during water repair", customer: "Joseph Harris", phone: "(763) 555-0904", projectId: "MN-0378", category: "Service Request", priority: "URGENT", status: "IN_PROGRESS", assignee: "Mike Torres", created: "Mar 29", updated: "Mar 30", description: "Mold discovered behind bathroom wall during water damage repair. Scope must be expanded. Insurance notification required.", messages: [
    { author: "Mike Torres", text: "Joseph, during demo today we found black mold behind the wall cavity — approximately 12 sq ft. This needs to be addressed before we can close the walls. I'm notifying your adjuster now.", time: "Mar 29, 2:00 PM", isStaff: true },
    { author: "Joseph Harris", text: "Is this covered by insurance? Is my family safe?", time: "Mar 29, 2:15 PM", isStaff: false },
    { author: "Mike Torres", text: "We've set up negative air pressure containment — your family is safe. This is a covered extension of your water damage claim. I'm submitting the supplement now.", time: "Mar 29, 2:30 PM", isStaff: true },
  ]},
];

// ─── DATA GENERATORS ───
const branches = ["Blaine, MN", "Port Charlotte, FL"];
const stages: ("LEAD" | "JOB" | "COMPLETE")[] = ["LEAD", "JOB", "COMPLETE"];
const pipelineStages = ["Lead", "Contacted", "Inspected", "Quoted", "Signed", "In Progress", "Complete"];
const stageColors: Record<string, string> = { LEAD: "#3b82f6", JOB: "#f59e0b", COMPLETE: "#10b981" };
const repNames = ["Mike Torres", "Sarah Chen", "Jake Williams", "Ana Rodriguez", "Tom Baker", "Lisa Park"];
const streets = ["Maple Dr", "Oak Ave", "Pine St", "Elm Blvd", "Cedar Ln", "Birch Ct", "Willow Way", "Aspen Rd", "Cherry Pl", "Spruce Dr"];
const cities: Record<string, string[]> = {
  "Blaine, MN": ["Plymouth", "Maple Grove", "Brooklyn Park", "Blaine", "Coon Rapids", "Fridley", "Andover", "Champlin", "Minnetonka", "Eden Prairie"],
  "Port Charlotte, FL": ["Port Charlotte", "Punta Gorda", "North Port", "Englewood", "Venice", "Sarasota", "Cape Coral", "Fort Myers", "Lehigh Acres", "Bonita Springs"],
};
const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Chris", "Lisa"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const leadSources = ["Google Ads", "Facebook", "Referral", "Door Knock", "Yard Sign", "Home Show", "Yelp", "Nextdoor", "Insurance", "Website"];
const projectTypes = ["Roof Replacement", "Siding", "Windows", "Gutters", "Storm Damage", "Full Remodel", "Deck", "Painting", "Insulation", "Solar"];

const rng = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h = h * 16807 % 2147483647;
    return (h - 1) / 2147483646;
  };
};

const genProjects = (branch: string, count: number): Project[] => {
  const r = rng(branch);
  return Array.from({ length: count }, (_, i) => {
    const stage = stages[Math.floor(r() * 3)];
    const pIdx = stage === "COMPLETE" ? 6 : stage === "JOB" ? Math.floor(r() * 3) + 3 : Math.floor(r() * 3);
    const city = cities[branch][Math.floor(r() * 10)];
    const quote = Math.round((r() * 45000 + 5000) * 100) / 100;
    const cost = Math.round(quote * (0.4 + r() * 0.25) * 100) / 100;
    return {
      id: `${branch === "Blaine, MN" ? "MN" : "FL"}-${String(i + 1).padStart(4, "0")}`,
      address: `${Math.floor(r() * 9999) + 100} ${streets[Math.floor(r() * 10)]}`,
      city,
      state: branch === "Blaine, MN" ? "MN" : "FL",
      customer: `${firstNames[Math.floor(r() * 20)]} ${lastNames[Math.floor(r() * 20)]}`,
      phone: `(${Math.floor(r() * 900) + 100}) ${Math.floor(r() * 900) + 100}-${Math.floor(r() * 9000) + 1000}`,
      email: `customer${i}@email.com`,
      rep: repNames[Math.floor(r() * 6)],
      date: `2026-${String(Math.floor(r() * 3) + 1).padStart(2, "0")}-${String(Math.floor(r() * 28) + 1).padStart(2, "0")}`,
      stage,
      pipeline: pipelineStages[pIdx],
      pipelineIdx: pIdx,
      progress: Math.round((pIdx / 6) * 100),
      type: projectTypes[Math.floor(r() * 10)],
      source: leadSources[Math.floor(r() * 10)],
      quote,
      cost,
      profit: quote - cost,
      lat: branch === "Blaine, MN" ? 45.0 + r() * 0.3 : 26.8 + r() * 0.3,
      lng: branch === "Blaine, MN" ? -93.5 + r() * 0.3 : -82.2 + r() * 0.3,
      insurance: r() > 0.5 ? {
        company: ["State Farm", "Allstate", "USAA", "Progressive", "Farmers"][Math.floor(r() * 5)],
        claim: `CLM-${Math.floor(r() * 99999)}`,
        deductible: [500, 1000, 1500, 2000][Math.floor(r() * 4)],
      } : null,
      notes: [`Initial inspection scheduled`, `Customer very interested`, `Needs HOA approval`, `Insurance adjuster meeting set`, `Materials ordered`][Math.floor(r() * 5)],
      warranty: stage === "COMPLETE" ? {
        years: [1, 2, 3, 5][Math.floor(r() * 4)],
        expires: `202${7 + Math.floor(r() * 4)}-${String(Math.floor(r() * 12) + 1).padStart(2, "0")}-01`,
      } : null,
    };
  });
};

const allProjects: Record<string, Project[]> = {
  "Blaine, MN": genProjects("Blaine, MN", 420),
  "Port Charlotte, FL": genProjects("Port Charlotte, FL", 240),
};

// ─── STORM DATA ───
const stormAlerts = [
  { id: 1, type: "HAIL", severity: "high", location: "Plymouth, MN", time: "2h", size: "1.5 inch", wind: "60mph", msg: "Large hail approaching Plymouth. ETA 2 hours.", ts: "Mar 16, 2026 2:15 PM", active: true },
  { id: 2, type: "WIND", severity: "medium", location: "Maple Grove, MN", time: "4h", size: null, wind: "55mph", msg: "High winds expected in Maple Grove area.", ts: "Mar 16, 2026 1:30 PM", active: true },
  { id: 3, type: "TORNADO", severity: "critical", location: "Brooklyn Park, MN", time: "1h", size: null, wind: "85mph", msg: "Tornado warning issued. Seek shelter immediately.", ts: "Mar 16, 2026 3:00 PM", active: true },
  { id: 4, type: "HAIL", severity: "low", location: "Fridley, MN", time: "6h", size: "0.75 inch", wind: "35mph", msg: "Small hail possible in Fridley area.", ts: "Mar 16, 2026 11:00 AM", active: false },
  { id: 5, type: "WIND", severity: "medium", location: "Coon Rapids, MN", time: "3h", size: null, wind: "50mph", msg: "Damaging winds approaching Coon Rapids.", ts: "Mar 16, 2026 12:45 PM", active: true },
];

const stormHistory = [
  { date: "2026-03-10", type: "Hail", location: "Plymouth", severity: "Severe", claims: 47, revenue: 842000 },
  { date: "2026-02-28", type: "Wind", location: "Maple Grove", severity: "Moderate", claims: 23, revenue: 391000 },
  { date: "2026-02-14", type: "Ice", location: "Blaine", severity: "Severe", claims: 61, revenue: 1100000 },
  { date: "2026-01-20", type: "Wind", location: "Brooklyn Park", severity: "Minor", claims: 12, revenue: 180000 },
  { date: "2025-12-15", type: "Hail", location: "Fridley", severity: "Severe", claims: 55, revenue: 935000 },
  { date: "2025-11-02", type: "Tornado", location: "Champlin", severity: "Critical", claims: 89, revenue: 2100000 },
];

const doorRoutes = [
  { territory: "Plymouth North", addresses: 34, priority: "HIGH", script: "storm_hail", assignee: "Mike Torres", status: "In Progress" },
  { territory: "Plymouth South", addresses: 28, priority: "HIGH", script: "storm_hail", assignee: "Sarah Chen", status: "Queued" },
  { territory: "Maple Grove East", addresses: 22, priority: "MEDIUM", script: "storm_wind", assignee: "Jake Williams", status: "Queued" },
  { territory: "Brooklyn Park", addresses: 41, priority: "CRITICAL", script: "storm_tornado", assignee: "Ana Rodriguez", status: "In Progress" },
  { territory: "Coon Rapids", addresses: 19, priority: "MEDIUM", script: "storm_wind", assignee: "Tom Baker", status: "Not Started" },
];

const adCampaigns = [
  { zip: "55441", city: "Plymouth", platform: "Facebook", budget: 500, leads: 12, status: "Active", cpl: 41.67 },
  { zip: "55442", city: "Plymouth", platform: "Google", budget: 750, leads: 18, status: "Active", cpl: 41.67 },
  { zip: "55369", city: "Maple Grove", platform: "Facebook", budget: 400, leads: 8, status: "Active", cpl: 50.00 },
  { zip: "55445", city: "Brooklyn Park", platform: "Google", budget: 600, leads: 15, status: "Active", cpl: 40.00 },
  { zip: "55448", city: "Coon Rapids", platform: "Facebook", budget: 350, leads: 6, status: "Pending", cpl: 58.33 },
];

// ─── CREW / INVENTORY / WARRANTY DATA ───
const crewMembers = [
  { id: 1, name: "Team Alpha", lead: "Carlos M.", members: 4, specialty: "Roofing", status: "On Site", project: "MN-0023", location: "Plymouth" },
  { id: 2, name: "Team Bravo", lead: "Derek L.", members: 3, specialty: "Siding", status: "En Route", project: "MN-0089", location: "Maple Grove" },
  { id: 3, name: "Team Charlie", lead: "Ryan K.", members: 5, specialty: "Windows", status: "Available", project: null as string | null, location: "Warehouse" },
  { id: 4, name: "Team Delta", lead: "Marcus J.", members: 4, specialty: "Gutters", status: "On Site", project: "MN-0156", location: "Blaine" },
  { id: 5, name: "Team Echo", lead: "Sam P.", members: 3, specialty: "Painting", status: "Off Duty", project: null as string | null, location: "—" },
];

const inventory = [
  { id: 1, item: "OC Duration Shingles", cat: "Roofing", stock: 245, unit: "squares", min: 50, cost: 89.99, supplier: "ABC Supply" },
  { id: 2, item: "Ice & Water Shield", cat: "Roofing", stock: 18, unit: "rolls", min: 25, cost: 52.00, supplier: "ABC Supply" },
  { id: 3, item: "LP SmartSide Panels", cat: "Siding", stock: 180, unit: "panels", min: 40, cost: 34.50, supplier: "Menards Pro" },
  { id: 4, item: "Andersen 400 Windows", cat: "Windows", stock: 8, unit: "units", min: 15, cost: 285.00, supplier: "Andersen Direct" },
  { id: 5, item: '6" K-Style Gutters', cat: "Gutters", stock: 320, unit: "ft", min: 100, cost: 4.25, supplier: "Gutter Supply Co" },
  { id: 6, item: "Drip Edge Flashing", cat: "Roofing", stock: 42, unit: "pcs", min: 30, cost: 8.75, supplier: "ABC Supply" },
  { id: 7, item: "Sherwin-Williams Paint", cat: "Painting", stock: 35, unit: "gal", min: 20, cost: 42.00, supplier: "SW Pro" },
  { id: 8, item: "Composite Decking", cat: "Decking", stock: 12, unit: "boards", min: 50, cost: 28.00, supplier: "Menards Pro" },
];

// ─── MAIN APP ───
const PortalDashboard = () => {
  const [branch, setBranch] = useState("Blaine, MN");
  const [page, setPage] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  const [sideOpen, setSideOpen] = useState(!isMobile);
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSideOpen(false);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [projPage, setProjPage] = useState(1);
  const [revPeriod, setRevPeriod] = useState("month");
  const [stormTab, setStormTab] = useState("alerts");
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketFilter, setTicketFilter] = useState("ALL");
  const [ticketReply, setTicketReply] = useState("");
  const [newTicketOpen, setNewTicketOpen] = useState(false);

  const projects = allProjects[branch];

  const filtered = useMemo(() => {
    let f = projects;
    if (stageFilter !== "ALL") f = f.filter(p => p.stage === stageFilter);
    if (searchQ) f = f.filter(p => p.customer.toLowerCase().includes(searchQ.toLowerCase()) || p.address.toLowerCase().includes(searchQ.toLowerCase()) || p.id.toLowerCase().includes(searchQ.toLowerCase()));
    return f;
  }, [projects, stageFilter, searchQ]);

  const perPage = 15;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((projPage - 1) * perPage, projPage * perPage);

  const stats = useMemo(() => {
    const p = projects;
    const leads = p.filter(x => x.stage === "LEAD").length;
    const jobs = p.filter(x => x.stage === "JOB").length;
    const complete = p.filter(x => x.stage === "COMPLETE").length;
    const rev = p.filter(x => x.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0);
    const pipeline = p.filter(x => x.stage !== "COMPLETE").reduce((a, x) => a + x.quote, 0);
    const profit = p.filter(x => x.stage === "COMPLETE").reduce((a, x) => a + x.profit, 0);
    const avgClose = complete > 0 ? Math.round((complete / (leads + jobs + complete)) * 100) : 0;
    return { leads, jobs, complete, total: p.length, rev, pipeline, profit, avgClose };
  }, [projects]);

  const revMultiplier: Record<string, number> = { day: 0.004, week: 0.03, month: 0.12, year: 1 };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Icons.Home },
    { id: "projects", label: "Projects", icon: Icons.File },
    { id: "map", label: "Project Map", icon: Icons.Map },
    { id: "calendar", label: "Scheduling", icon: Icons.Calendar },
    { id: "financial", label: "Financial", icon: Icons.Dollar },
    { id: "storm", label: "Storm Intel", icon: Icons.Cloud },
    { id: "comms", label: "SMS / Email", icon: Icons.Phone },
    { id: "crews", label: "Crews & GPS", icon: Icons.Truck },
    { id: "inventory", label: "Inventory", icon: Icons.Box },
    { id: "warranty", label: "Warranty", icon: Icons.Shield },
    { id: "reports", label: "Reports", icon: Icons.Chart },
    { id: "leads", label: "Lead Source", icon: Icons.Target },
    { id: "tickets", label: "Tickets", icon: Icons.Ticket },
    { id: "admin", label: "Admin", icon: Icons.Settings },
  ];

  const severityColor: Record<string, string> = { critical: "#ef4444", high: "#f97316", medium: "#eab308", low: "#22c55e" };

  // ─── COMPONENTS ───
  const Badge = ({ color, children }: { color: string; children: React.ReactNode }) => (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44` }} className="px-2 py-0.5 rounded-full text-xs font-semibold">{children}</span>
  );

  const StatCard = ({ icon: Ic, label, value, sub, color = "#3b82f6" }: { icon: React.FC; label: string; value: string | number; sub?: string; color?: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <div style={{ background: color + "18" }} className="p-2 rounded-lg"><span style={{ color }}><Ic /></span></div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );

  const ProgressBar = ({ value, color = "#3b82f6", h = 6 }: { value: number; color?: string; h?: number }) => (
    <div className="w-full bg-gray-200 rounded-full" style={{ height: h }}>
      <div className="rounded-full transition-all" style={{ width: `${value}%`, height: h, background: color }} />
    </div>
  );

  const Tab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{children}</button>
  );

  // ─── DASHBOARD ───
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Revenue Period:</span>
          {["day", "week", "month", "year"].map(p => (
            <button key={p} onClick={() => setRevPeriod(p)} className={`px-3 py-1 text-xs rounded-full font-medium ${revPeriod === p ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Icons.File} label="Total Projects" value={stats.total} sub={`${stats.leads} leads / ${stats.jobs} active / ${stats.complete} done`} color="#6366f1" />
        <StatCard icon={Icons.Dollar} label={`Revenue (${revPeriod})`} value={`$${Math.round(stats.rev * revMultiplier[revPeriod]).toLocaleString()}`} sub="Completed projects" color="#10b981" />
        <StatCard icon={Icons.Chart} label="Pipeline Value" value={`$${Math.round(stats.pipeline).toLocaleString()}`} sub={`${stats.leads + stats.jobs} active projects`} color="#f59e0b" />
        <StatCard icon={Icons.Target} label="Close Rate" value={`${stats.avgClose}%`} sub={`${stats.complete} of ${stats.total} closed`} color="#8b5cf6" />
      </div>
      {/* Dashboard Tiles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Project Alerts", count: 7, color: "#ef4444", icon: Icons.Alert },
          { label: "Insurance Alerts", count: 3, color: "#f97316", icon: Icons.Shield },
          { label: "Trade Approval", count: 5, color: "#eab308", icon: Icons.Check },
          { label: "Add Lead", count: "+", color: "#3b82f6", icon: Icons.Plus },
          { label: "Visited Today", count: 12, color: "#10b981", icon: Icons.GPS },
          { label: "Trade Requests", count: 8, color: "#8b5cf6", icon: Icons.Truck },
          { label: "Mobile Uploads", count: 24, color: "#06b6d4", icon: Icons.Phone },
          { label: "Pending Docs", count: 15, color: "#ec4899", icon: Icons.File },
        ].map((tile, i) => (
          <button key={i} onClick={() => tile.label === "Add Lead" ? setModal("addLead") : null} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all hover:-translate-y-0.5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span style={{ color: tile.color }}><tile.icon /></span>
              <span style={{ background: tile.color, fontSize: 14 }} className="text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">{tile.count}</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">{tile.label}</div>
          </button>
        ))}
      </div>
      {/* Active Storm Alert Banner */}
      {stormAlerts.filter(a => a.active && a.severity === "critical").length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-500 mt-0.5 animate-pulse"><Icons.Alert /></span>
          <div>
            <div className="font-bold text-red-800">ACTIVE STORM WARNING</div>
            <div className="text-red-700 text-sm mt-1">{stormAlerts.find(a => a.severity === "critical")?.msg}</div>
            <button onClick={() => { setPage("storm"); setStormTab("alerts"); }} className="mt-2 bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700">View Storm Intel →</button>
          </div>
        </div>
      )}
      {/* Revenue Mini Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue by Rep</h3>
        <div className="space-y-3">
          {repNames.map((rep, i) => {
            const repRev = projects.filter(p => p.rep === rep && p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0);
            const maxRev = Math.max(...repNames.map(r => projects.filter(p => p.rep === r && p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0)));
            return (
              <div key={rep} className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-700 font-medium truncate">{rep}</div>
                <div className="flex-1"><ProgressBar value={maxRev > 0 ? (repRev / maxRev) * 100 : 0} color={["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"][i]} h={8} /></div>
                <div className="w-24 text-right text-sm font-semibold text-gray-900">${Math.round(repRev).toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Pipeline Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Pipeline Overview</h3>
        <div className="flex gap-1">
          {pipelineStages.map((s, i) => {
            const count = projects.filter(p => p.pipelineIdx === i).length;
            const colors = ["#94a3b8", "#3b82f6", "#8b5cf6", "#f59e0b", "#f97316", "#06b6d4", "#10b981"];
            return (
              <div key={s} className="flex-1 text-center">
                <div style={{ background: colors[i], height: Math.max(20, count * 1.5) }} className="rounded-t-lg mx-0.5 transition-all" />
                <div className="text-xs font-medium text-gray-700 mt-2 truncate">{s}</div>
                <div className="text-lg font-bold" style={{ color: colors[i] }}>{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ─── PROJECTS TABLE ───
  const ProjectsView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-900">Projects <span className="text-base font-normal text-gray-500">({filtered.length})</span></h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setModal("addLead")} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5"><Icons.Plus /> Add Lead</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Export CSV</button>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <span className="absolute left-3 top-2.5 text-gray-400"><Icons.Search /></span>
          <input value={searchQ} onChange={e => { setSearchQ(e.target.value); setProjPage(1); }} placeholder="Search projects, customers, addresses..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-1">
          {["ALL", "LEAD", "JOB", "COMPLETE"].map(s => (
            <button key={s} onClick={() => { setStageFilter(s); setProjPage(1); }} className={`px-3 py-2 text-xs rounded-lg font-medium ${stageFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["ID", "Address", "Customer", "Rep", "Date", "Type", "Stage", "Progress", "Quote", "Actions"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => setSelectedProject(p)}>
                  <td className="px-3 py-2.5 font-mono text-xs text-blue-600 font-medium">{p.id}</td>
                  <td className="px-3 py-2.5"><div className="font-medium text-gray-900 text-xs">{p.address}</div><div className="text-gray-500 text-xs">{p.city}, {p.state}</div></td>
                  <td className="px-3 py-2.5 text-gray-900 text-xs font-medium">{p.customer}</td>
                  <td className="px-3 py-2.5 text-gray-600 text-xs">{p.rep}</td>
                  <td className="px-3 py-2.5 text-gray-600 text-xs">{p.date}</td>
                  <td className="px-3 py-2.5 text-xs">{p.type}</td>
                  <td className="px-3 py-2.5"><Badge color={stageColors[p.stage]}>{p.stage}</Badge></td>
                  <td className="px-3 py-2.5 w-28"><ProgressBar value={p.progress} color={stageColors[p.stage]} /><span className="text-xs text-gray-500">{p.progress}%</span></td>
                  <td className="px-3 py-2.5 text-gray-900 font-medium text-xs">${p.quote.toLocaleString()}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      <button onClick={e => { e.stopPropagation(); setSelectedProject(p); }} className="p-1 rounded hover:bg-blue-100 text-blue-600"><Icons.Eye /></button>
                      <button onClick={e => e.stopPropagation()} className="p-1 rounded hover:bg-gray-100 text-gray-500"><Icons.Edit /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">Showing {(projPage - 1) * perPage + 1}–{Math.min(projPage * perPage, filtered.length)} of {filtered.length}</div>
          <div className="flex gap-1">
            <button disabled={projPage <= 1} onClick={() => setProjPage(p => p - 1)} className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100">Prev</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pg = projPage <= 3 ? i + 1 : projPage + i - 2;
              if (pg < 1 || pg > totalPages) return null;
              return <button key={pg} onClick={() => setProjPage(pg)} className={`px-3 py-1 text-sm rounded ${pg === projPage ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>{pg}</button>;
            })}
            <button disabled={projPage >= totalPages} onClick={() => setProjPage(p => p + 1)} className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── PROJECT DETAIL MODAL ───
  const ProjectDetail = ({ project: p }: { project: Project }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto" onClick={() => setSelectedProject(null)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mb-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{p.id} — {p.customer}</h3>
            <div className="text-sm text-gray-500">{p.address}, {p.city}, {p.state}</div>
          </div>
          <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 rounded-lg"><Icons.X /></button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Pipeline Stage</h4>
            <div className="flex gap-1">
              {pipelineStages.map((s, i) => (
                <div key={s} className={`flex-1 text-center py-2 rounded-lg text-xs font-medium ${i <= p.pipelineIdx ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{s}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Customer Info</h4>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{p.customer}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{p.phone}</span></div>
                <div><span className="text-gray-500">Email:</span> <span className="font-medium">{p.email}</span></div>
                <div><span className="text-gray-500">Lead Source:</span> <Badge color="#6366f1">{p.source}</Badge></div>
                <div><span className="text-gray-500">Sales Rep:</span> <span className="font-medium">{p.rep}</span></div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Financials</h4>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Quote:</span><span className="font-bold text-green-700">${p.quote.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Costs:</span><span className="font-medium text-red-600">-${p.cost.toLocaleString()}</span></div>
                <hr className="my-1" />
                <div className="flex justify-between"><span className="text-gray-500">Profit:</span><span className="font-bold text-blue-700">${Math.round(p.profit).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Margin:</span><span className="font-medium">{Math.round((p.profit / p.quote) * 100)}%</span></div>
              </div>
            </div>
          </div>
          {p.insurance && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Insurance Information</h4>
              <div className="bg-orange-50 rounded-lg p-3 text-sm space-y-1 border border-orange-200">
                <div><span className="text-gray-500">Company:</span> <span className="font-medium">{p.insurance.company}</span></div>
                <div><span className="text-gray-500">Claim #:</span> <span className="font-mono">{p.insurance.claim}</span></div>
                <div><span className="text-gray-500">Deductible:</span> <span className="font-medium">${p.insurance.deductible.toLocaleString()}</span></div>
              </div>
            </div>
          )}
          {p.warranty && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Warranty</h4>
              <div className="bg-green-50 rounded-lg p-3 text-sm border border-green-200">
                <span className="font-medium">{p.warranty.years}-Year Warranty</span> — Expires: {p.warranty.expires}
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes</h4>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">{p.notes}</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Photos</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-200 rounded-lg h-20 flex items-center justify-center text-xs text-gray-500">BEFORE</div>
                <div className="bg-gray-200 rounded-lg h-20 flex items-center justify-center text-xs text-gray-500">AFTER</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Documents</h4>
            <div className="flex gap-2 flex-wrap">
              {["Estimate.pdf", "Contract.pdf", "Insurance_Claim.pdf", "Photos.zip", "Invoice.pdf"].map(d => (
                <div key={d} className="bg-gray-100 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-100 cursor-pointer flex items-center gap-1"><Icons.File />{d}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Send SMS</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">Create Invoice</button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">Schedule Crew</button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">Edit Project</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── MAP VIEW ───
  const MapView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Project Map</h2>
      <div className="flex gap-3 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Lead</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> Job</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Complete</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Storm Zone</span>
      </div>
      <div className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden" style={{ height: 500 }}>
        <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50">
          <div className="absolute inset-0 p-4">
            <div className="relative w-full h-full">
              {filtered.slice(0, 80).map((p) => {
                const baseX = branch === "Blaine, MN" ? -93.5 : -82.2;
                const baseY = branch === "Blaine, MN" ? 45.0 : 26.8;
                const x = ((p.lng - baseX) / 0.3) * 100;
                const y = 100 - ((p.lat - baseY) / 0.3) * 100;
                const colors: Record<string, string> = { LEAD: "#3b82f6", JOB: "#f59e0b", COMPLETE: "#10b981" };
                return (
                  <div key={p.id} className="absolute cursor-pointer hover:scale-150 transition-transform z-10" style={{ left: `${Math.max(2, Math.min(95, x))}%`, top: `${Math.max(2, Math.min(95, y))}%` }} onClick={() => setSelectedProject(p)} title={`${p.id}: ${p.customer}`}>
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm border border-white" style={{ background: colors[p.stage] }} />
                  </div>
                );
              })}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-3 text-sm">
                <div className="font-semibold mb-1">{branch}</div>
                <div className="text-gray-500">{filtered.length} projects mapped</div>
              </div>
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow p-2 text-xs text-gray-500">
                Google Maps integration point<br />Color-coded pins by stage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── FINANCIAL ───
  const FinancialView = () => {
    const totalQuote = projects.filter(p => p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0);
    const totalCost = projects.filter(p => p.stage === "COMPLETE").reduce((a, x) => a + x.cost, 0);
    const totalProfit = totalQuote - totalCost;
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <StatCard icon={Icons.Dollar} label="Total Revenue" value={`$${Math.round(totalQuote).toLocaleString()}`} color="#10b981" />
          <StatCard icon={Icons.Dollar} label="Total Costs" value={`$${Math.round(totalCost).toLocaleString()}`} color="#ef4444" />
          <StatCard icon={Icons.Dollar} label="Net Profit" value={`$${Math.round(totalProfit).toLocaleString()}`} color="#3b82f6" />
          <StatCard icon={Icons.Chart} label="Avg Margin" value={`${Math.round((totalProfit / totalQuote) * 100)}%`} color="#8b5cf6" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Profit & Loss Statement</h3>
          <div className="space-y-2">
            {[
              { label: "Revenue — Roofing", val: Math.round(totalQuote * 0.55), type: "rev" },
              { label: "Revenue — Siding", val: Math.round(totalQuote * 0.2), type: "rev" },
              { label: "Revenue — Windows", val: Math.round(totalQuote * 0.12), type: "rev" },
              { label: "Revenue — Other", val: Math.round(totalQuote * 0.13), type: "rev" },
              { label: "Material Costs", val: -Math.round(totalCost * 0.6), type: "exp" },
              { label: "Labor Costs", val: -Math.round(totalCost * 0.3), type: "exp" },
              { label: "Equipment & Overhead", val: -Math.round(totalCost * 0.1), type: "exp" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{row.label}</span>
                <span className={`text-sm font-semibold ${row.type === "rev" ? "text-green-700" : "text-red-600"}`}>{row.val < 0 ? "-" : ""}${Math.abs(row.val).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t-2 border-gray-300">
              <span className="font-bold text-gray-900">Net Income</span>
              <span className="font-bold text-blue-700 text-lg">${Math.round(totalProfit).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 overflow-x-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Invoices</h3>
          <table className="w-full text-sm min-w-[600px]">
            <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="pb-2">Invoice</th><th className="pb-2">Customer</th><th className="pb-2">Amount</th><th className="pb-2">Status</th><th className="pb-2">Date</th></tr></thead>
            <tbody>
              {projects.filter(p => p.stage === "COMPLETE").slice(0, 8).map((p, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 font-mono text-blue-600">INV-{String(i + 1001).padStart(5, "0")}</td>
                  <td className="py-2">{p.customer}</td>
                  <td className="py-2 font-semibold">${p.quote.toLocaleString()}</td>
                  <td className="py-2"><Badge color={i % 3 === 0 ? "#f59e0b" : "#10b981"}>{i % 3 === 0 ? "Pending" : "Paid"}</Badge></td>
                  <td className="py-2 text-gray-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ─── STORM INTELLIGENCE ───
  const StormView = () => (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2"><span className="text-red-500"><Icons.Cloud /></span> Storm Intelligence Center</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-700 font-medium">NOAA/NWS Live Feed Active</span>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["alerts", "routes", "ads", "history", "zones"].map(t => (
          <Tab key={t} active={stormTab === t} onClick={() => setStormTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</Tab>
        ))}
      </div>
      {stormTab === "alerts" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <StatCard icon={Icons.Alert} label="Active Alerts" value={stormAlerts.filter(a => a.active).length} color="#ef4444" />
            <StatCard icon={Icons.Cloud} label="Monitoring" value="Minneapolis Metro" sub="24/7 NOAA + NWS" color="#3b82f6" />
            <StatCard icon={Icons.Target} label="Response Teams" value="3 Ready" sub="Auto-dispatch enabled" color="#10b981" />
          </div>
          <div className="space-y-3">
            {stormAlerts.map(a => (
              <div key={a.id} className={`rounded-xl border-2 p-3 sm:p-4 ${a.active ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex-shrink-0 ${a.active ? 'animate-pulse' : ''}`}><span style={{ color: severityColor[a.severity] }}><Icons.Alert /></span></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{a.type} WARNING</span>
                      <Badge color={severityColor[a.severity]}>{a.severity.toUpperCase()}</Badge>
                      {a.active && <Badge color="#ef4444">ACTIVE</Badge>}
                      {a.active && <button className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 ml-auto">Deploy Team</button>}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{a.msg}</div>
                    <div className="flex gap-3 sm:gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                      <span>📍 {a.location}</span>
                      <span>⏱ ETA: {a.time}</span>
                      {a.wind && <span>💨 {a.wind}</span>}
                      {a.size && <span>🧊 {a.size} hail</span>}
                      <span>{a.ts}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {stormTab === "routes" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Door-Knocking Routes</h3>
            <table className="w-full text-sm min-w-[600px]">
              <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="pb-2">Territory</th><th className="pb-2">Addresses</th><th className="pb-2">Priority</th><th className="pb-2">Script</th><th className="pb-2">Assigned To</th><th className="pb-2">Status</th><th className="pb-2">Actions</th></tr></thead>
              <tbody>
                {doorRoutes.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{r.territory}</td>
                    <td className="py-3">{r.addresses}</td>
                    <td className="py-3"><Badge color={r.priority === "CRITICAL" ? "#ef4444" : r.priority === "HIGH" ? "#f97316" : "#eab308"}>{r.priority}</Badge></td>
                    <td className="py-3 text-xs font-mono">{r.script}</td>
                    <td className="py-3">{r.assignee}</td>
                    <td className="py-3"><Badge color={r.status === "In Progress" ? "#3b82f6" : r.status === "Queued" ? "#f59e0b" : "#94a3b8"}>{r.status}</Badge></td>
                    <td className="py-3"><button className="text-blue-600 text-xs font-medium hover:underline">View Route</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Hail Damage Script — Plymouth</h4>
            <div className="text-sm text-yellow-900 space-y-2">
              <p>"Hi, I'm [NAME] from Smart Construction & Remodeling. We're a local company based right here in Minnesota."</p>
              <p>"We noticed significant hail came through your area recently. We're offering free inspections to your neighbors and wanted to extend the same offer."</p>
              <p>"Most homeowners don't realize their insurance covers storm damage with no out-of-pocket cost beyond the deductible. Would you like a free 15-minute inspection?"</p>
            </div>
          </div>
        </div>
      )}
      {stormTab === "ads" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <StatCard icon={Icons.Zap} label="Active Campaigns" value={adCampaigns.filter(a => a.status === "Active").length} color="#3b82f6" />
            <StatCard icon={Icons.Dollar} label="Total Ad Spend" value={`$${adCampaigns.reduce((a, c) => a + c.budget, 0).toLocaleString()}`} color="#f59e0b" />
            <StatCard icon={Icons.Target} label="Total Leads" value={adCampaigns.reduce((a, c) => a + c.leads, 0)} sub={`Avg CPL: $${Math.round(adCampaigns.reduce((a, c) => a + c.budget, 0) / adCampaigns.reduce((a, c) => a + c.leads, 0))}`} color="#10b981" />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Auto-Launched Campaigns by Zip Code</h3>
            <table className="w-full text-sm min-w-[600px]">
              <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="pb-2">Zip</th><th className="pb-2">City</th><th className="pb-2">Platform</th><th className="pb-2">Budget</th><th className="pb-2">Leads</th><th className="pb-2">CPL</th><th className="pb-2">Status</th></tr></thead>
              <tbody>
                {adCampaigns.map((c, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 font-mono">{c.zip}</td>
                    <td className="py-3">{c.city}</td>
                    <td className="py-3"><Badge color={c.platform === "Facebook" ? "#3b82f6" : "#ef4444"}>{c.platform}</Badge></td>
                    <td className="py-3">${c.budget}</td>
                    <td className="py-3 font-semibold">{c.leads}</td>
                    <td className="py-3">${c.cpl.toFixed(2)}</td>
                    <td className="py-3"><Badge color={c.status === "Active" ? "#10b981" : "#f59e0b"}>{c.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {stormTab === "history" && (
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 overflow-x-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Storm History Database</h3>
          <table className="w-full text-sm min-w-[600px]">
            <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="pb-2">Date</th><th className="pb-2">Type</th><th className="pb-2">Location</th><th className="pb-2">Severity</th><th className="pb-2">Claims</th><th className="pb-2">Revenue</th></tr></thead>
            <tbody>
              {stormHistory.map((s, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3">{s.date}</td>
                  <td className="py-3"><Badge color={s.type === "Hail" ? "#3b82f6" : s.type === "Tornado" ? "#ef4444" : "#f59e0b"}>{s.type}</Badge></td>
                  <td className="py-3">{s.location}</td>
                  <td className="py-3"><Badge color={s.severity === "Critical" ? "#ef4444" : s.severity === "Severe" ? "#f97316" : s.severity === "Moderate" ? "#eab308" : "#94a3b8"}>{s.severity}</Badge></td>
                  <td className="py-3 font-semibold">{s.claims}</td>
                  <td className="py-3 font-semibold text-green-700">${s.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-blue-700">{stormHistory.reduce((a, s) => a + s.claims, 0)}</div><div className="text-xs text-blue-600">Total Claims</div></div>
            <div className="bg-green-50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-green-700">${(stormHistory.reduce((a, s) => a + s.revenue, 0) / 1000000).toFixed(1)}M</div><div className="text-xs text-green-600">Total Storm Revenue</div></div>
            <div className="bg-purple-50 rounded-lg p-3 text-center"><div className="text-2xl font-bold text-purple-700">${Math.round(stormHistory.reduce((a, s) => a + s.revenue, 0) / stormHistory.reduce((a, s) => a + s.claims, 0)).toLocaleString()}</div><div className="text-xs text-purple-600">Avg Revenue / Claim</div></div>
          </div>
        </div>
      )}
      {stormTab === "zones" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Post-Storm Damage Zone Map</h3>
          <div className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden" style={{ height: 400 }}>
            <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-red-50 p-4">
              {[
                { name: "Plymouth", x: 30, y: 35, r: 50, severity: "high" },
                { name: "Brooklyn Park", x: 55, y: 25, r: 40, severity: "critical" },
                { name: "Maple Grove", x: 25, y: 55, r: 35, severity: "medium" },
                { name: "Coon Rapids", x: 65, y: 50, r: 30, severity: "medium" },
              ].map((z, i) => (
                <div key={i} className="absolute flex items-center justify-center" style={{ left: `${z.x}%`, top: `${z.y}%`, width: z.r * 2, height: z.r * 2, borderRadius: "50%", background: `${severityColor[z.severity]}22`, border: `2px dashed ${severityColor[z.severity]}`, transform: "translate(-50%,-50%)" }}>
                  <div className="text-center">
                    <div className="text-xs font-bold" style={{ color: severityColor[z.severity] }}>{z.name}</div>
                    <Badge color={severityColor[z.severity]}>{z.severity}</Badge>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-3 text-xs">
                <div className="font-semibold mb-1">Damage Zones</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> High</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Medium</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ─── COMMS (SMS/Email) ───
  const CommsView = () => {
    const [commsTab, setCommsTab] = useState("sms");
    const smsTemplates = [
      { name: "Inspection Scheduled", trigger: "Auto", msg: "Hi {name}, your inspection is confirmed for {date} at {time}. - Smart Construction" },
      { name: "Job Complete", trigger: "Auto", msg: "Hi {name}, your {type} project is complete! Please review and let us know if you have questions." },
      { name: "Review Request (24h)", trigger: "24h post-complete", msg: "Hi {name}, we hope you love your new {type}! Would you leave us a review? {link}" },
      { name: "Follow-up (3d)", trigger: "3 days", msg: "Hi {name}, just checking in on your {type} project. Any questions or concerns?" },
      { name: "Follow-up (7d)", trigger: "7 days", msg: "Hi {name}, it's been a week since your free inspection. Ready to move forward? Call us!" },
    ];
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Communications Hub</h2>
        <div className="flex gap-2">
          <Tab active={commsTab === "sms"} onClick={() => setCommsTab("sms")}>SMS (Twilio)</Tab>
          <Tab active={commsTab === "email"} onClick={() => setCommsTab("email")}>Email (Mailgun)</Tab>
          <Tab active={commsTab === "history"} onClick={() => setCommsTab("history")}>History</Tab>
        </div>
        {commsTab === "sms" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={Icons.Phone} label="Sent Today" value="47" color="#3b82f6" />
              <StatCard icon={Icons.Check} label="Delivered" value="45" color="#10b981" />
              <StatCard icon={Icons.Alert} label="Failed" value="2" color="#ef4444" />
              <StatCard icon={Icons.Target} label="Response Rate" value="34%" color="#8b5cf6" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Automated SMS Templates</h3>
              {smsTemplates.map((t, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2"><span className="font-semibold text-gray-900 text-sm">{t.name}</span><Badge color="#6366f1">{t.trigger}</Badge></div>
                    <div className="text-sm text-gray-600 mt-1 bg-gray-50 rounded p-2 font-mono text-xs">{t.msg}</div>
                  </div>
                  <button className="text-blue-600 text-xs font-medium hover:underline">Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {commsTab === "email" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Email Templates (Mailgun)</h3>
            {["Welcome / Thank You", "Estimate Attached", "Invoice Sent", "Review Request", "Warranty Reminder", "Seasonal Promo", "Storm Alert — Free Inspection"].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-900">{t}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600 text-xs font-medium hover:underline">Preview</button>
                  <button className="text-gray-500 text-xs font-medium hover:underline">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {commsTab === "history" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Communication History</h3>
            {projects.slice(0, 10).map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <Badge color={i % 2 === 0 ? "#3b82f6" : "#10b981"}>{i % 2 === 0 ? "SMS" : "Email"}</Badge>
                <span className="text-sm font-medium text-gray-900">{p.customer}</span>
                <span className="text-xs text-gray-500 flex-1">{["Review request sent", "Estimate emailed", "Inspection reminder", "Follow-up sent", "Invoice sent"][i % 5]}</span>
                <span className="text-xs text-gray-400">{p.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── CREWS & GPS ───
  const CrewsView = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">Crews & GPS Tracking</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Icons.Truck} label="Active Crews" value={crewMembers.filter(c => c.status === "On Site" || c.status === "En Route").length} color="#3b82f6" />
        <StatCard icon={Icons.GPS} label="Tracked Vehicles" value="8" color="#10b981" />
        <StatCard icon={Icons.Users} label="Total Crew Members" value={crewMembers.reduce((a, c) => a + c.members, 0)} color="#8b5cf6" />
        <StatCard icon={Icons.Map} label="Miles Today" value="247" sub="12 routes" color="#f59e0b" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead><tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase border-b"><th className="px-4 py-3">Crew</th><th className="px-4 py-3">Lead</th><th className="px-4 py-3">Members</th><th className="px-4 py-3">Specialty</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Project</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Actions</th></tr></thead>
          <tbody>
            {crewMembers.map(c => (
              <tr key={c.id} className="border-b border-gray-100">
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3">{c.lead}</td>
                <td className="px-4 py-3">{c.members}</td>
                <td className="px-4 py-3">{c.specialty}</td>
                <td className="px-4 py-3"><Badge color={c.status === "On Site" ? "#10b981" : c.status === "En Route" ? "#3b82f6" : c.status === "Available" ? "#8b5cf6" : "#94a3b8"}>{c.status}</Badge></td>
                <td className="px-4 py-3 font-mono text-blue-600">{c.project || "—"}</td>
                <td className="px-4 py-3 text-gray-600">{c.location}</td>
                <td className="px-4 py-3"><button className="text-blue-600 text-xs font-medium hover:underline">Track</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ─── INVENTORY ───
  const InventoryView = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Icons.Box} label="Total Items" value={inventory.length} color="#3b82f6" />
        <StatCard icon={Icons.Alert} label="Low Stock" value={inventory.filter(i => i.stock < i.min).length} color="#ef4444" />
        <StatCard icon={Icons.Dollar} label="Inventory Value" value={`$${Math.round(inventory.reduce((a, i) => a + i.stock * i.cost, 0)).toLocaleString()}`} color="#10b981" />
        <StatCard icon={Icons.Truck} label="Pending Orders" value="3" color="#f59e0b" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead><tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase border-b"><th className="px-4 py-3">Item</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Min</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Unit Cost</th><th className="px-4 py-3">Supplier</th><th className="px-4 py-3">Actions</th></tr></thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className={`border-b border-gray-100 ${item.stock < item.min ? 'bg-red-50' : ''}`}>
                <td className="px-4 py-3 font-medium">{item.item}</td>
                <td className="px-4 py-3">{item.cat}</td>
                <td className="px-4 py-3 font-semibold">{item.stock} {item.unit}</td>
                <td className="px-4 py-3 text-gray-500">{item.min}</td>
                <td className="px-4 py-3">{item.stock < item.min ? <Badge color="#ef4444">LOW — REORDER</Badge> : <Badge color="#10b981">OK</Badge>}</td>
                <td className="px-4 py-3">${item.cost.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-600">{item.supplier}</td>
                <td className="px-4 py-3"><button className="text-blue-600 text-xs font-medium hover:underline">Order</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ─── WARRANTY ───
  const WarrantyView = () => {
    const warrantyProjects = projects.filter(p => p.warranty);
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Warranty Tracking</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <StatCard icon={Icons.Shield} label="Active Warranties" value={warrantyProjects.length} color="#3b82f6" />
          <StatCard icon={Icons.Alert} label="Expiring (30d)" value={Math.floor(warrantyProjects.length * 0.08)} color="#f59e0b" />
          <StatCard icon={Icons.Calendar} label="Inspections Due" value={Math.floor(warrantyProjects.length * 0.12)} color="#8b5cf6" />
          <StatCard icon={Icons.Check} label="Claims Resolved" value={Math.floor(warrantyProjects.length * 0.05)} color="#10b981" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[650px]">
            <thead><tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase border-b"><th className="px-4 py-3">Project</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Coverage</th><th className="px-4 py-3">Expires</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
            <tbody>
              {warrantyProjects.slice(0, 12).map(p => (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-blue-600">{p.id}</td>
                  <td className="px-4 py-3 font-medium">{p.customer}</td>
                  <td className="px-4 py-3">{p.type}</td>
                  <td className="px-4 py-3"><Badge color="#3b82f6">{p.warranty!.years}-Year</Badge></td>
                  <td className="px-4 py-3">{p.warranty!.expires}</td>
                  <td className="px-4 py-3"><Badge color="#10b981">Active</Badge></td>
                  <td className="px-4 py-3"><button className="text-blue-600 text-xs font-medium hover:underline">Free Inspection Offer</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ─── SCHEDULING ───
  const CalendarView = () => {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Crew Scheduling — March 2026</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-7">
            {weekDays.map(d => <div key={d} className="p-2 text-center text-xs font-semibold text-gray-500 bg-gray-50 border-b border-r border-gray-200">{d}</div>)}
            {Array.from({ length: new Date(2026, 2, 1).getDay() === 0 ? 6 : new Date(2026, 2, 1).getDay() - 1 }, (_, i) => (
              <div key={`pad-${i}`} className="p-2 border-b border-r border-gray-200 bg-gray-50 min-h-20" />
            ))}
            {days.map(d => {
              const evts = crewMembers.filter(c => c.status !== "Off Duty" && (d % (c.id + 2) === 0));
              return (
                <div key={d} className={`p-1.5 border-b border-r border-gray-200 min-h-20 ${d === 16 ? 'bg-blue-50' : ''}`}>
                  <div className={`text-xs font-medium mb-1 ${d === 16 ? 'text-blue-700 font-bold' : 'text-gray-700'}`}>{d}</div>
                  {evts.slice(0, 2).map((e, i) => (
                    <div key={i} className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-0.5 truncate">{e.name}</div>
                  ))}
                  {evts.length > 2 && <div className="text-xs text-gray-500">+{evts.length - 2} more</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ─── REPORTS ───
  const ReportsView = () => {
    const [reportType, setReportType] = useState("sales_rep");
    const reportTypes = [
      { id: "sales_rep", name: "Sales Rep Performance" },
      { id: "subcontractor", name: "Subcontractor Report" },
      { id: "trades", name: "Trades Breakdown" },
      { id: "revenue", name: "Revenue Report" },
      { id: "lead_source", name: "Lead Source ROI" },
      { id: "close_rate", name: "Close Rate Analysis" },
      { id: "project_log", name: "Project Log" },
      { id: "performance", name: "Performance Dashboard" },
    ];
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <div className="flex gap-2 flex-wrap">
          {reportTypes.map(r => <Tab key={r.id} active={reportType === r.id} onClick={() => setReportType(r.id)}>{r.name}</Tab>)}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 overflow-x-auto">
          {reportType === "sales_rep" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Sales Rep Performance</h3>
              <table className="w-full text-sm min-w-[600px]">
                <thead><tr className="text-left text-xs text-gray-500 uppercase border-b"><th className="pb-2">Rep</th><th className="pb-2">Leads</th><th className="pb-2">Inspections</th><th className="pb-2">Quotes</th><th className="pb-2">Signed</th><th className="pb-2">Revenue</th><th className="pb-2">Close Rate</th></tr></thead>
                <tbody>
                  {repNames.map((rep) => {
                    const repP = projects.filter(p => p.rep === rep);
                    const leads = repP.filter(p => p.stage === "LEAD").length;
                    const signed = repP.filter(p => p.stage === "COMPLETE").length;
                    const rev = repP.filter(p => p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0);
                    return (
                      <tr key={rep} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{rep}</td>
                        <td className="py-3">{leads}</td>
                        <td className="py-3">{Math.round(leads * 0.7)}</td>
                        <td className="py-3">{Math.round(leads * 0.5)}</td>
                        <td className="py-3 font-semibold">{signed}</td>
                        <td className="py-3 font-semibold text-green-700">${Math.round(rev).toLocaleString()}</td>
                        <td className="py-3"><Badge color={signed / (leads || 1) > 0.3 ? "#10b981" : "#f59e0b"}>{Math.round((signed / (repP.length || 1)) * 100)}%</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {reportType === "lead_source" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Lead Source ROI</h3>
              <div className="space-y-3">
                {leadSources.map(src => {
                  const srcP = projects.filter(p => p.source === src);
                  const rev = srcP.filter(p => p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0);
                  const maxRev = Math.max(...leadSources.map(s => projects.filter(p => p.source === s && p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0)));
                  return (
                    <div key={src} className="flex items-center gap-3">
                      <div className="w-24 text-sm font-medium text-gray-700 truncate">{src}</div>
                      <div className="w-12 text-sm text-gray-500">{srcP.length}</div>
                      <div className="flex-1"><ProgressBar value={maxRev > 0 ? (rev / maxRev) * 100 : 0} color="#8b5cf6" h={8} /></div>
                      <div className="w-24 text-right text-sm font-semibold text-gray-900">${Math.round(rev).toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {reportType !== "sales_rep" && reportType !== "lead_source" && (
            <div className="text-center py-12">
              <Icons.Chart />
              <h3 className="font-semibold text-gray-900 mt-3">{reportTypes.find(r => r.id === reportType)?.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Full report with export options, date range filters, and drill-down capabilities.</p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Generate Report</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── LEAD SOURCE ───
  const LeadSourceView = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">Lead Source Analytics</h2>
      <div className="grid grid-cols-5 gap-3">
        {leadSources.slice(0, 5).map(src => {
          const count = projects.filter(p => p.source === src).length;
          const rev = projects.filter(p => p.source === src && p.stage === "COMPLETE").reduce((a, x) => a + x.quote, 0);
          return <StatCard key={src} icon={Icons.Target} label={src} value={count} sub={`$${Math.round(rev).toLocaleString()} rev`} color={["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"][leadSources.indexOf(src) % 5]} />;
        })}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">All Channels — ROI Breakdown</h3>
        {leadSources.map(src => {
          const srcP = projects.filter(p => p.source === src);
          const complete = srcP.filter(p => p.stage === "COMPLETE");
          const rev = complete.reduce((a, x) => a + x.quote, 0);
          const spend = Math.round(rev * 0.08);
          const roi = spend > 0 ? Math.round((rev - spend) / spend * 100) : 0;
          return (
            <div key={src} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
              <div className="w-24 text-sm font-medium">{src}</div>
              <div className="w-16 text-sm text-gray-500">{srcP.length} leads</div>
              <div className="w-16 text-sm">{complete.length} closed</div>
              <div className="flex-1"><ProgressBar value={Math.min(100, roi / 5)} color={roi > 500 ? "#10b981" : "#f59e0b"} h={6} /></div>
              <div className="w-20 text-sm font-semibold text-green-700">{roi}% ROI</div>
              <div className="w-24 text-right text-sm font-semibold">${Math.round(rev).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── ADMIN ───
  const AdminView = () => {
    const members = [
      { name: "John Morrison", role: "Owner", email: "john@smartconstructionmn.com", branch: "All", status: "Active" },
      ...repNames.map((n, i) => ({ name: n, role: i < 2 ? "Sales Rep" : i < 4 ? "Project Manager" : "Subcontractor", email: `${n.split(" ")[0].toLowerCase()}@smartconstructionmn.com`, branch: i % 2 === 0 ? "Blaine, MN" : "Port Charlotte, FL", status: "Active" })),
      { name: "Admin User", role: "Admin", email: "admin@smartconstructionmn.com", branch: "All", status: "Active" },
    ];
    const roles = [
      { role: "Owner", perms: ["All Access", "Financial", "Admin", "Reports", "Delete"] },
      { role: "Admin", perms: ["All Access", "Financial", "Reports"] },
      { role: "Sales Rep", perms: ["CRM", "Projects", "Leads", "SMS", "Calendar"] },
      { role: "Project Manager", perms: ["Projects", "Crews", "Scheduling", "Inventory", "GPS"] },
      { role: "Subcontractor", perms: ["Assigned Projects", "Time Tracking", "Photos"] },
    ];
    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Admin & Permissions</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Team Members</h3>
            {members.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={m.role === "Owner" ? "#ef4444" : m.role === "Admin" ? "#8b5cf6" : "#3b82f6"}>{m.role}</Badge>
                  <span className="text-xs text-gray-400">{m.branch}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Role Permissions</h3>
            {roles.map((r, i) => (
              <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                <div className="font-semibold text-sm mb-2">{r.role}</div>
                <div className="flex gap-1 flex-wrap">
                  {r.perms.map(p => <span key={p} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── TICKETS ───
  const priorityColor: Record<string, string> = { URGENT: "#ef4444", HIGH: "#f97316", MEDIUM: "#eab308", LOW: "#6b7280" };
  const statusColor: Record<string, string> = { OPEN: "#3b82f6", IN_PROGRESS: "#8b5cf6", PENDING: "#f59e0b", RESOLVED: "#10b981", CLOSED: "#6b7280" };
  const statusLabel: Record<string, string> = { OPEN: "Open", IN_PROGRESS: "In Progress", PENDING: "Pending", RESOLVED: "Resolved", CLOSED: "Closed" };

  const TicketsView = () => {
    const filterOptions = ["ALL", "OPEN", "IN_PROGRESS", "PENDING", "RESOLVED", "CLOSED"];
    const filtered = ticketFilter === "ALL" ? tickets : tickets.filter(t => t.status === ticketFilter);
    const openCount = tickets.filter(t => t.status === "OPEN").length;
    const urgentCount = tickets.filter(t => t.priority === "URGENT" && t.status !== "RESOLVED" && t.status !== "CLOSED").length;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
            <p className="text-sm text-gray-500 mt-0.5">{openCount} open · {urgentCount > 0 && <span className="text-red-500 font-semibold">{urgentCount} urgent</span>}{urgentCount === 0 && "0 urgent"}</p>
          </div>
          <button onClick={() => setNewTicketOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">
            <Icons.Plus /> New Ticket
          </button>
        </div>
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map(f => {
            const count = f === "ALL" ? tickets.length : tickets.filter(t => t.status === f).length;
            return (
              <button key={f} onClick={() => setTicketFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${ticketFilter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {statusLabel[f] ?? "All"} {count > 0 && <span className="ml-1 opacity-70">{count}</span>}
              </button>
            );
          })}
        </div>
        {/* Ticket Cards */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">No tickets in this category.</div>
          )}
          {filtered.map(ticket => (
            <button key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-200 transition-all" style={{ borderLeft: `4px solid ${priorityColor[ticket.priority]}` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                  <span style={{ background: priorityColor[ticket.priority] + "18", color: priorityColor[ticket.priority], border: `1px solid ${priorityColor[ticket.priority]}44` }} className="px-2 py-0.5 rounded-full text-xs font-bold">{ticket.priority}</span>
                  <span style={{ background: statusColor[ticket.status] + "18", color: statusColor[ticket.status], border: `1px solid ${statusColor[ticket.status]}44` }} className="px-2 py-0.5 rounded-full text-xs font-semibold">{statusLabel[ticket.status]}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{ticket.updated}</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm leading-snug mb-2">{ticket.title}</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">{ticket.customer}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">{ticket.category}</span>
                  {ticket.projectId && <span className="text-blue-500">{ticket.projectId}</span>}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Icons.Msg />
                  <span>{ticket.messages.length}</span>
                  <span className="ml-2">{ticket.assignee}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const TicketDetailModal = ({ ticket }: { ticket: Ticket }) => {
    const sendReply = () => {
      if (!ticketReply.trim()) return;
      const updated = tickets.map(t => t.id === ticket.id ? {
        ...t,
        messages: [...t.messages, { author: "John Morrison", text: ticketReply.trim(), time: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }), isStaff: true }],
        status: "IN_PROGRESS" as Ticket["status"],
        updated: "Just now",
      } : t);
      setTickets(updated);
      setSelectedTicket(updated.find(t => t.id === ticket.id) || null);
      setTicketReply("");
    };
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4" onClick={() => setSelectedTicket(null)}>
        <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[92vh]" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
            <div className="flex-1 min-w-0 pr-3">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                <span style={{ background: priorityColor[ticket.priority] + "18", color: priorityColor[ticket.priority], border: `1px solid ${priorityColor[ticket.priority]}44` }} className="px-2 py-0.5 rounded-full text-xs font-bold">{ticket.priority}</span>
                <span style={{ background: statusColor[ticket.status] + "18", color: statusColor[ticket.status] }} className="px-2 py-0.5 rounded-full text-xs font-semibold">{statusLabel[ticket.status]}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug">{ticket.title}</h3>
            </div>
            <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"><Icons.X /></button>
          </div>
          {/* Info bar */}
          <div className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div><span className="text-gray-400">Customer</span><p className="font-semibold text-gray-800">{ticket.customer}</p></div>
              <div><span className="text-gray-400">Phone</span><p className="font-semibold text-gray-800">{ticket.phone}</p></div>
              <div><span className="text-gray-400">Category</span><p className="font-semibold text-gray-800">{ticket.category}</p></div>
              <div><span className="text-gray-400">Assigned To</span><p className="font-semibold text-gray-800">{ticket.assignee}</p></div>
            </div>
            {ticket.projectId && <p className="text-xs text-blue-500 mt-2">Linked Project: <strong>{ticket.projectId}</strong></p>}
            <p className="text-xs text-gray-500 mt-1">{ticket.description}</p>
          </div>
          {/* Status controls */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-gray-100 flex-shrink-0 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Set Status:</span>
            {(["OPEN", "IN_PROGRESS", "PENDING", "RESOLVED", "CLOSED"] as Ticket["status"][]).map(s => (
              <button key={s} onClick={() => { const upd = tickets.map(t => t.id === ticket.id ? { ...t, status: s, updated: "Just now" } : t); setTickets(upd); setSelectedTicket(upd.find(t => t.id === ticket.id) || null); }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${ticket.status === s ? 'text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                style={ticket.status === s ? { background: statusColor[s] } : {}}>
                {statusLabel[s]}
              </button>
            ))}
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {ticket.messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.isStaff ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.isStaff ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {msg.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div className={`max-w-[80%] ${msg.isStaff ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isStaff ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>{msg.text}</div>
                  <span className="text-xs text-gray-400 mt-1 px-1">{msg.author} · {msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Reply input */}
          <div className="p-4 sm:p-5 border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <textarea value={ticketReply} onChange={e => setTicketReply(e.target.value)} placeholder="Type a reply..." rows={2}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={sendReply} className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors flex-shrink-0"><Icons.Send /></button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    );
  };

  const NewTicketModal = () => {
    const cats = ["Warranty Claim", "Service Request", "Emergency", "Change Order", "Complaint", "Material Request"] as const;
    const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4" onClick={() => setNewTicketOpen(false)}>
        <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">New Ticket</h3>
            <button onClick={() => setNewTicketOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><Icons.X /></button>
          </div>
          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {[{ label: "Customer Name", placeholder: "John Smith" }, { label: "Phone", placeholder: "(612) 000-0000" }, { label: "Project ID (optional)", placeholder: "MN-0001" }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input placeholder={f.placeholder} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {cats.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {priorities.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
              <input placeholder="Brief description of the issue" className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} placeholder="Detailed description..." className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
              <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {repNames.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setNewTicketOpen(false)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700">Create Ticket</button>
              <button onClick={() => setNewTicketOpen(false)} className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── ADD LEAD MODAL ───
  const AddLeadModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setModal(null)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Add New Lead</h3>
          <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><Icons.X /></button>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: "Customer Name", placeholder: "John Smith" },
            { label: "Phone", placeholder: "(555) 123-4567" },
            { label: "Email", placeholder: "john@email.com" },
            { label: "Address", placeholder: "123 Main St" },
            { label: "City", placeholder: "Plymouth" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input placeholder={f.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {projectTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {leadSources.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sales Rep</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              {repNames.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModal(null)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700">Save Lead</button>
            <button onClick={() => setModal(null)} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── PAGE ROUTER ───
  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardView />;
      case "projects": return <ProjectsView />;
      case "map": return <MapView />;
      case "calendar": return <CalendarView />;
      case "financial": return <FinancialView />;
      case "storm": return <StormView />;
      case "comms": return <CommsView />;
      case "crews": return <CrewsView />;
      case "inventory": return <InventoryView />;
      case "warranty": return <WarrantyView />;
      case "reports": return <ReportsView />;
      case "leads": return <LeadSourceView />;
      case "tickets": return <TicketsView />;
      case "admin": return <AdminView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Desktop sidebar — only on desktop */}
      {!isMobile && (
        <aside
          className="bg-gray-900 text-white flex-shrink-0 flex flex-col transition-all duration-200"
          style={{ width: sideOpen ? 224 : 64 }}
        >
          <div className="p-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <button onClick={() => setSideOpen(!sideOpen)} className="p-1.5 hover:bg-gray-800 rounded-lg"><Icons.Menu /></button>
              {sideOpen && <span className="font-bold text-sm truncate">Smart Construction</span>}
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto py-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setPage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${page === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <item.icon />
                {sideOpen && <span className="truncate">{item.label}</span>}
                {item.id === "storm" && !sideOpen && stormAlerts.filter(a => a.active && a.severity === "critical").length > 0 && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
              </button>
            ))}
          </nav>
          {sideOpen && (
            <div className="p-3 border-t border-gray-800 text-xs text-gray-500">
              v2.0 — © 2026 Smart Construction
            </div>
          )}
        </aside>
      )}
      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white border-b border-gray-200 px-3 sm:px-5 py-3 flex items-center justify-between flex-shrink-0 relative">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Hamburger — on mobile opens dropdown menu, on desktop hidden (sidebar has its own) */}
            {isMobile && (
              <button onClick={() => setSideOpen(!sideOpen)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <Icons.Menu />
              </button>
            )}
            <select value={branch} onChange={e => { setBranch(e.target.value); setProjPage(1); }} className="bg-gray-100 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <div className="text-sm text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Icons.Bell />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">5</span>
            </button>
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 sm:px-3 py-1.5">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">JM</div>
              <span className="text-sm font-medium hidden sm:inline">John Morrison</span>
            </div>
          </div>
          {/* Mobile dropdown menu — compact, no overlay, just a dropdown under hamburger */}
          {isMobile && sideOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setSideOpen(false)} />
              <div className="absolute left-2 top-full mt-1 z-40 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-2 w-52 max-h-[70vh] overflow-y-auto"
                style={{ animation: "fadeIn .15s ease" }}>
                <div className="px-3 py-2 border-b border-gray-700 mb-1">
                  <span className="text-white font-bold text-sm">Smart Construction</span>
                </div>
                {navItems.map(item => (
                  <button key={item.id} onClick={() => { setPage(item.id); setSideOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${page === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.id === "storm" && stormAlerts.filter(a => a.active && a.severity === "critical").length > 0 && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-auto" />}
                  </button>
                ))}
                <div className="px-3 py-2 border-t border-gray-700 mt-1 text-xs text-gray-500">
                  v2.0 — © 2026 Smart Construction
                </div>
              </div>
            </>
          )}
        </header>
        <div className="flex-1 overflow-y-auto p-3 sm:p-5">
          {renderPage()}
        </div>
      </main>
      {/* Modals */}
      {selectedProject && <ProjectDetail project={selectedProject} />}
      {selectedTicket && <TicketDetailModal ticket={selectedTicket} />}
      {newTicketOpen && <NewTicketModal />}
      {modal === "addLead" && <AddLeadModal />}
    </div>
  );
};

export default PortalDashboard;
