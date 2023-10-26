import { GetDynamicComponent, Lazy } from "lean-jsx/lib/server/components";

async function wait(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}

export async function SlowMessage({ children }: SXL.Props) {
    await wait(2000);
    return <p>{children}</p>;
}

export async function SlowWithLoading({ children }: SXL.Props) {
    await Promise.resolve();
    return (
        <Lazy loading={<>Loading slow message...</>}>
            <SlowMessage>{children}</SlowMessage>
        </Lazy>
    );
}

export const DynamicMessage = GetDynamicComponent(
    "my-non-blocking-async-component",
    async () => {
        await wait(4000);
        return "Message from async request!";
    },
    data => {
        if (data.isPending) {
            return <div className="loading"></div>;
        }
        return <p>{data.value}</p>;
    }
);
