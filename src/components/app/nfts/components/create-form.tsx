"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
// import { uploadImageToIPFS } from "@/utils/upload"
import ImagePicker from "@/components/common/image-picker"
import { Icons } from "@/components/common/icon"
import { Separator } from "@/components/ui/separator"


const nftFormSchema = z.object({
  assetName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  assetQuantity: z.string().refine(
    (val) => {
      const parsedValue = parseInt(val, 10);
      return !Number.isNaN(parsedValue) && parsedValue > 0;
    }, {
    message: "Invalid value"
  }).optional(),

  label: z.string().optional(),
  recipient: z.string().optional(),
  // link: z.string().optional(),
  // type: z.string().optional(),

  attributes: z
    .array(
      z.object({
        trait_type: z.string().min(2, { message: "Please enter a type." }),
        value: z.string().min(2, { message: "Please enter a value." }),
      })
    )
    .optional(),

})

type NftFormValues = z.infer<typeof nftFormSchema>
const defaultValues: Partial<NftFormValues> = {
  assetQuantity: "1",
  label: "721",
  recipient: "",
  attributes: [
    { trait_type: "name", value: "" },
    { trait_type: "description", value: "" },
  ],
}

export function CreateNftForm() {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("IDLE");
//   const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

  const [image, setImage] = useState<File>();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NftFormValues>({
    resolver: zodResolver(nftFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "attributes",
    control: form.control,
  })

  async function onSubmit(data: NftFormValues) {
    // try {

    //   const metadata: any = {};
    //   setIsLoading(true)
    //   if (!image) {
    //     return
    //   }
    //   const { assetName, assetQuantity, recipient, attributes, label } = data
    //   if (attributes) {
    //     attributes.forEach(item => {
    //       metadata[item.trait_type] = item.value;
    //     });
    //   }
    //   setStatus("uploading to ipfs...");
    //   const cid = "";
    //   metadata["image"] = cid;
    //   metadata["mediaType"] = image.type;
    //   metadata["files"] = [{
    //     src: cid,
    //     name: image.name,
    //     mediaType: image.type
    //   }]
    //   setStatus("create transaction ...");
    // //   const recipientAddress = recipient || await wallet.getChangeAddress();
    //   const asset = {
    //     assetName: assetName,
    //     label: label as '20' | '721' | '777' || "721",
    //     assetQuantity: assetQuantity || "1",
    //     metadata,
    //     recipient: recipientAddress
    //   }
    //   console.log(asset)
    //   const forgingScript = ForgeScript.withOneSignature(recipientAddress);
    //   const tx = new Transaction({ initiator: wallet });
    //   tx.mintAsset(forgingScript, asset);
    //   tx.setChangeAddress(recipientAddress);
    //   const unsignedTx = await tx.build();
    //   const signedTx = await wallet.signTx(unsignedTx);
    //   const txHash = await wallet.submitTx(signedTx);
    //   setTxHash(txHash);
    // } catch (e: any) {
    //   setTxHash(e.message);
    // } finally {
    //   setStatus("IDLE");
    //   setIsLoading(false)
    // }

  }

  return (
    <div className="h-full px-4 py-6 lg:px-8">

      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0  rounded-md border border-dashed">

        <div className="lg:p-8 ">
          <ImagePicker setImage={setImage} />

        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create NFT
              </h1>
              <p className="text-sm text-muted-foreground">
                You can create a single NFT or editions. Open Editions allow you to create an unlimited number of prints. Limited Editions allow you to set a limit to how many prints can be created from the original.
              </p>

            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="Blockchain_Data" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="Blockchain_Data" className="relative">
                        Blockchain Data
                      </TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent
                    value="Blockchain_Data"
                    className="h-[29rem] border-none p-0 outline-none gap-2"
                  ><FormField
                      control={form.control}
                      name="assetName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asset Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a Name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="assetQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asset Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue="721">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="721" id="r1" />
                                <Label htmlFor="r1">Non fungible asset (721)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="20" id="r2" />
                                <Label htmlFor="r2">Fungible asset (20)</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recipient"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />


                  </TabsContent>
                  <TabsContent
                    value="metadata"
                    className="h-[29rem] flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <div>
                      {fields.map((field, index) => (
                        <div key={`${index}-${field.trait_type}`} className="mt-4 grid grid-cols-12 gap-2">
                          <div className="col-span-5">
                            <FormField
                              control={form.control}
                              name={`attributes.${index}.trait_type`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="e. g. Size"  {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-6">
                            <FormField
                              control={form.control}
                              name={`attributes.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="e. g. Medium" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-1">
                            <Button
                              type="button"
                              variant="outline"
                              className="p-2"
                              onClick={() => remove(index)}
                            >
                              <Icons.trash />
                            </Button>
                          </div>
                        </div>
                      ))}


                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ trait_type: "", value: "" })}
                      >
                        Add Data
                      </Button>
                    </div>
                    <Separator className="my-4" />
                  </TabsContent>
                </Tabs>
                <Button type="submit" disabled={isloading}>{isloading ? status : "Create NFT"} </Button>

                {/* {connected ? (
                ) : (
                  <CardanoWallet />
                )} */}
                {txHash && (
                  <div>
                    <code>{txHash}</code>
                  </div>
                )}


              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>


  )
}