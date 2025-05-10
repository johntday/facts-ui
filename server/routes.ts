import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get all claim verifications
  app.get('/api/claims', async (req, res) => {
    try {
      const claims = await storage.getAllClaimVerifications();
      res.json(claims);
    } catch (error) {
      console.error('Error fetching claims:', error);
      res.status(500).json({ error: 'Failed to fetch claims' });
    }
  });

  // Get a specific claim verification by ID
  app.get('/api/claims/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const idSchema = z.string().min(1);
      
      try {
        idSchema.parse(id);
      } catch (validationError) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const claim = await storage.getClaimVerificationById(id);
      
      if (!claim) {
        return res.status(404).json({ error: 'Claim verification not found' });
      }
      
      res.json(claim);
    } catch (error) {
      console.error('Error fetching claim by ID:', error);
      res.status(500).json({ error: 'Failed to fetch claim verification' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
