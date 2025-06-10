import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function Sidebar({
  aspectRatio,
  setAspectRatio,
  croppingMethod,
  setCroppingMethod,
  customRatio,
  setCustomRatio,
  isOpen
}) {
  const [customWidth, setCustomWidth] = useState(customRatio.width);
  const [customHeight, setCustomHeight] = useState(customRatio.height);

  const handleCustomRatioChange = () => {
    const width = parseInt(customWidth) || 1;
    const height = parseInt(customHeight) || 1;
    setCustomRatio({ width, height });
    setAspectRatio('custom');
  };

  return (
    <aside className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-64 p-4 border-r bg-background`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Aspect Ratio</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={aspectRatio === '1:1' ? 'default' : 'outline'}
              onClick={() => setAspectRatio('1:1')}
              className="w-full"
            >
              1:1
            </Button>
            <Button
              variant={aspectRatio === '16:9' ? 'default' : 'outline'}
              onClick={() => setAspectRatio('16:9')}
              className="w-full"
            >
              16:9
            </Button>
            <Button
              variant={aspectRatio === '4:3' ? 'default' : 'outline'}
              onClick={() => setAspectRatio('4:3')}
              className="w-full"
            >
              4:3
            </Button>
            <Button
              variant={aspectRatio === '3:2' ? 'default' : 'outline'}
              onClick={() => setAspectRatio('3:2')}
              className="w-full"
            >
              3:2
            </Button>
          </div>

          <div className="mt-3">
            <Label className="text-sm">Custom Ratio</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                min="1"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="w-20"
              />
              <span>:</span>
              <Input
                type="number"
                min="1"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="w-20"
              />
              <Button
                size="sm"
                onClick={handleCustomRatioChange}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Cropping Method</h3>
          <RadioGroup
            value={croppingMethod}
            onValueChange={setCroppingMethod}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="content-aware" id="content-aware" />
              <Label htmlFor="content-aware">Content-Aware</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="center" />
              <Label htmlFor="center">Center</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual">Manual</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </aside>
  );
}

