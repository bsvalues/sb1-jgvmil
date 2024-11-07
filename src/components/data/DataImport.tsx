import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { parseCSVData } from '@/lib/data/importers/csvImporter';
import { useDataStore } from '@/lib/data/dataStore';

export function DataImport() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const setProperties = useDataStore(state => state.setProperties);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setProgress(0);

    try {
      const content = await readFile(file, setProgress);
      const properties = parseCSVData(content);
      
      setProperties(properties);
      
      toast({
        title: 'Data Import Successful',
        description: `Imported ${properties.length} properties`
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'There was an error importing the data',
        variant: 'destructive'
      });
    } finally {
      setImporting(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={importing}
        >
          Import CSV Data
        </Button>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
          disabled={importing}
        />
      </div>

      {importing && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Importing data... {Math.round(progress)}%
          </div>
          <Progress value={progress} />
        </div>
      )}
    </div>
  );
}

function readFile(
  file: File, 
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress((event.loaded / event.total) * 100);
      }
    };
    
    reader.readAsText(file);
  });
}