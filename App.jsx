import { Upload, Download, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header({ onUpload, onDownload, isMobile, onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-bold">CropBatch</h1>
      </div>
      <div className="flex gap-2">
        <Button onClick={onUpload} className="flex items-center gap-1">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Button>
        <Button 
          onClick={onDownload} 
          variant="outline" 
          className="flex items-center gap-1"
          disabled={!onDownload}
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </div>
    </header>
  );
}

