import { Request } from 'express';
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

/* declare namespace Express {
  export interface Request {
    user: {
      id: string;
    }
  }
} */