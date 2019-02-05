export class BlockUi {
    loading: boolean;
    message: string;

    start(message?: string): void {
        this.loading = true;
        this.message = message;
    }
    stop(): void {
        this.loading = false;
        this.message = null;
    }
}
