import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, Music, Download, Loader2 } from "lucide-react";

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      toast({
        title: "Wideo wybrane",
        description: `${file.name} został wybrany`,
      });
    }
  };

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      toast({
        title: "Audio wybrane",
        description: `${file.name} został wybrany`,
      });
    }
  };

  const mergeFiles = async () => {
    if (!videoFile || !audioFile) {
      toast({
        title: "Błąd",
        description: "Wybierz oba pliki: wideo i audio",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Symulacja procesu łączenia z paskiem postępu
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // W prawdziwej aplikacji tutaj byłby kod do łączenia plików
      // np. przy użyciu FFmpeg.wasm
      
      toast({
        title: "Sukces!",
        description: "Pliki zostały pomyślnie połączone",
      });
      
      // Reset formularza
      setVideoFile(null);
      setAudioFile(null);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas łączenia plików",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Łączenie Wideo z Audio
          </h1>
          <p className="text-muted-foreground">
            Wybierz pliki wideo i audio, aby je połączyć w jeden film
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Wybierz plik wideo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
                id="video-input"
              />
              <label
                htmlFor="video-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Kliknij, aby wybrać plik wideo
                </span>
              </label>
              {videoFile && (
                <p className="mt-2 text-sm font-medium text-foreground">
                  Wybrano: {videoFile.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Wybierz plik audio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioSelect}
                className="hidden"
                id="audio-input"
              />
              <label
                htmlFor="audio-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Kliknij, aby wybrać plik audio
                </span>
              </label>
              {audioFile && (
                <p className="mt-2 text-sm font-medium text-foreground">
                  Wybrano: {audioFile.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {isProcessing && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Łączenie plików...</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                {progress}% ukończono
              </p>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={mergeFiles}
          disabled={!videoFile || !audioFile || isProcessing}
          className="w-full h-12 text-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Łączenie...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Połącz pliki
            </>
          )}
        </Button>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Obsługiwane formaty wideo: MP4, AVI, MOV, WMV</p>
          <p>Obsługiwane formaty audio: MP3, WAV, AAC, OGG</p>
        </div>
      </div>
    </div>
  );
};

export default Index;