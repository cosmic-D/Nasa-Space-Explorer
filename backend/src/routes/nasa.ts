import { Router, Request, Response } from 'express';
import { nasaService } from '../services/nasaService';

const router = Router();

// GET /api/nasa/apod - Astronomy Picture of the Day
router.get('/apod', async (req: Request, res: Response) => {
  try {
    const { date, start_date, end_date } = req.query;
    const data = await nasaService.getAPOD(
      date as string,
      start_date as string,
      end_date as string
    );
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/mars-rover - Mars Rover Photos
router.get('/mars-rover', async (req: Request, res: Response) => {
  try {
    const { 
      rover = 'curiosity', 
      sol, 
      earth_date, 
      camera, 
      page = '1' 
    } = req.query;
    
    // If no date or sol is provided, try to get recent photos
    let data;
    if (!earth_date && !sol) {
      // Try to get photos from the last few days
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      try {
        data = await nasaService.getMarsRoverPhotos(rover as string, 1, today, camera as string, parseInt(page as string));
        if (!data.photos || data.photos.length === 0) {
          data = await nasaService.getMarsRoverPhotos(rover as string, 1, yesterday, camera as string, parseInt(page as string));
        }
      } catch (err) {
        // If date-based queries fail, try with a recent sol number
        data = await nasaService.getMarsRoverPhotos(rover as string, 4000, undefined, camera as string, parseInt(page as string));
      }
    } else {
      data = await nasaService.getMarsRoverPhotos(
        rover as string,
        sol ? parseInt(sol as string) : undefined,
        earth_date as string,
        camera as string,
        parseInt(page as string)
      );
    }
    
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/mars-rovers - Available Mars Rovers
router.get('/mars-rovers', async (req: Request, res: Response) => {
  try {
    const data = await nasaService.getMarsRovers();
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/mars-rover-manifest/:rover - Mars Rover Manifest
router.get('/mars-rover-manifest/:rover', async (req: Request, res: Response) => {
  try {
    const { rover } = req.params;
    const data = await nasaService.getMarsRoverManifest(rover);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/neo - Near Earth Objects
router.get('/neo', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      res.status(400).json({ success: false, error: 'start_date and end_date are required' });
      return;
    }
    // NASA API only allows 7 days per request, so loop if needed
    const results = {};
    let current = new Date(start_date as string);
    const end = new Date(end_date as string);
    while (current <= end) {
      const rangeStart = current.toISOString().split('T')[0];
      const rangeEnd = new Date(Math.min(current.getTime() + 6 * 86400000, end.getTime()));
      const rangeEndStr = rangeEnd.toISOString().split('T')[0];
      const data = await nasaService.getNearEarthObjects(rangeStart, rangeEndStr);
      Object.assign(results, data.near_earth_objects);
      current = new Date(rangeEnd.getTime() + 86400000);
    }
    res.json({ success: true, data: { near_earth_objects: results } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/nasa/asteroid/:id - Asteroid Details
router.get('/asteroid/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await nasaService.getAsteroidDetails(id);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/epic - EPIC Images
router.get('/epic', async (req: Request, res: Response) => {
  try {
    const { date, type = 'natural' } = req.query;
    
    let data;
    if (type === 'enhanced') {
      data = await nasaService.getEPICEnhancedImages(date as string);
    } else {
      data = await nasaService.getEPICNaturalImages(date as string);
    }
    
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/search - NASA Image and Video Library Search
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { 
      q, 
      media_type = 'image', 
      year_start, 
      year_end, 
      page = '1' 
    } = req.query;
    
    if (!q) {
      res.status(400).json({ 
        success: false, 
        error: 'Query parameter "q" is required' 
      });
      return;
    }
    
    const data = await nasaService.searchNASAImages(
      q as string,
      media_type as string,
      year_start ? parseInt(year_start as string) : undefined,
      year_end ? parseInt(year_end as string) : undefined,
      parseInt(page as string)
    );
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/dashboard - Dashboard data (multiple endpoints)
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // APOD fallback: try today, then yesterday if needed
    let apod = null;
    let apodError = null;
    try {
      apod = await nasaService.getAPOD(today);
    } catch (err) {
      try {
        apod = await nasaService.getAPOD(yesterday);
      } catch (err2) {
        apodError = err2 instanceof Error ? err2.message : String(err2);
      }
    }

    // NEO fetch with default date range
    let neoData = null;
    let neoError = null;
    try {
      neoData = await nasaService.getNearEarthObjects(today, today);
    } catch (err) {
      neoError = err instanceof Error ? err.message : String(err);
    }

    // Mars Rover Photos: try to get recent photos from Curiosity
    let marsRoverData = null;
    let marsRoverError = null;
    try {
      // Try to get recent photos from Curiosity with a default sol
      marsRoverData = await nasaService.getMarsRoverPhotos('curiosity', 4000, undefined, undefined, 1);
      if (!marsRoverData || marsRoverData.photos?.length === 0) {
        // If no photos with sol 4000, try with a different sol
        marsRoverData = await nasaService.getMarsRoverPhotos('curiosity', 3500, undefined, undefined, 1);
      }
    } catch (err) {
      marsRoverError = err instanceof Error ? err.message : String(err);
    }

    const dashboardData = {
      apod,
      marsRoverData,
      neoData,
      errors: {
        apod: apodError,
        marsRoverData: marsRoverError,
        neoData: neoError
      }
    };

    res.json({ success: true, data: dashboardData });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/nasa/earth/imagery - NASA Earth Imagery
router.get('/earth/imagery', async (req, res) => {
  try {
    const { lat, lon, date, dim } = req.query;
    if (!lat || !lon) {
      res.status(400).json({ success: false, error: 'lat and lon are required' });
      return;
    }
    const data = await nasaService.getEarthImagery(
      parseFloat(lat as string),
      parseFloat(lon as string),
      date as string,
      dim ? parseFloat(dim as string) : undefined
    );
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/nasa/earth/assets - NASA Earth Assets
router.get('/earth/assets', async (req, res) => {
  try {
    const { lat, lon, date, dim } = req.query;
    if (!lat || !lon) {
      res.status(400).json({ success: false, error: 'lat and lon are required' });
      return;
    }
    const data = await nasaService.getEarthAssets(
      parseFloat(lat as string),
      parseFloat(lon as string),
      date as string,
      dim ? parseFloat(dim as string) : undefined
    );
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export { router as nasaRoutes }; 