import { 
  type User, 
  type InsertUser,
  type ClaimVerificationData,
  type ClaimDetail,
  type ClaimEvidence
} from "@shared/schema";
import fs from 'fs';
import path from 'path';

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Added methods for claim verification
  getAllClaimVerifications(): Promise<ClaimVerificationData[]>;
  getClaimVerificationById(id: string): Promise<ClaimVerificationData | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private claimVerifications: Map<string, ClaimVerificationData>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.claimVerifications = new Map();
    this.currentId = 1;
    this.loadClaimVerificationData();
  }

  // Load claim verification data from JSON files
  private loadClaimVerificationData() {
    try {
      const dataPath = path.resolve(process.cwd(), 'attached_assets');
      const files = fs.readdirSync(dataPath).filter(file => file.endsWith('.json'));
      
      files.forEach((file, index) => {
        const filePath = path.join(dataPath, file);
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData) as ClaimVerificationData;
        
        // Add an ID if it doesn't exist (using the filename without extension or index as fallback)
        const id = file.replace('.json', '');
        this.claimVerifications.set(id, {
          ...jsonData,
          id
        });
      });
      
      console.log(`Loaded ${this.claimVerifications.size} claim verification records`);
    } catch (error) {
      console.error('Error loading claim verification data:', error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllClaimVerifications(): Promise<ClaimVerificationData[]> {
    return Array.from(this.claimVerifications.values());
  }

  async getClaimVerificationById(id: string): Promise<ClaimVerificationData | undefined> {
    return this.claimVerifications.get(id);
  }
}

export const storage = new MemStorage();
